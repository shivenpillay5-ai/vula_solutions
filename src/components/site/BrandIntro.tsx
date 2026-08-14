import { useEffect, useRef, useState, type CSSProperties, type RefObject } from "react";

type IntroState = "waiting" | "playing" | "hidden";

type IntroTransform = {
  x: number;
  y: number;
  scale: number;
};

const INTRO_SESSION_KEY = "vula-intro-played";

// Runs synchronously during HTML parse, before first paint. The intro overlay is
// server-rendered on every page, so on loads where it should NOT play (any page that
// isn't the homepage, or a repeat view in this tab session) we must hide it before the
// browser paints — otherwise every refresh would flash the dark veil while React hydrates.
const INTRO_GUARD_SCRIPT = `(function(){try{if(location.pathname!=="/"||sessionStorage.getItem("${INTRO_SESSION_KEY}")==="1"){document.documentElement.setAttribute("data-vula-intro-skip","")}}catch(e){}})();`;

function shouldPlayIntro() {
  if (window.location.pathname !== "/") return false;
  try {
    return window.sessionStorage.getItem(INTRO_SESSION_KEY) !== "1";
  } catch {
    return true;
  }
}

function markIntroPlayed() {
  try {
    window.sessionStorage.setItem(INTRO_SESSION_KEY, "1");
  } catch {
    // Private browsing with storage disabled — the intro will simply replay next load.
  }
}

function getVisibleIntroTarget() {
  const targets = Array.from(document.querySelectorAll<SVGElement>('[data-brand-intro-target="true"]'));

  return targets.find((target) => {
    const rect = target.getBoundingClientRect();
    if (rect.width <= 0 || rect.height <= 0) return false;

    const styles = window.getComputedStyle(target);
    return styles.display !== "none" && styles.visibility !== "hidden";
  });
}

function IntroMark({ markRef }: { markRef: RefObject<SVGSVGElement | null> }) {
  return (
    <div className="vula-intro__mark-wrap" aria-hidden="true">
      {/* All light lives BEHIND the doors (z2, doors z3). The opening panels act as a
          natural mask: a crack of light appears, widens, and floods — nothing is overlaid. */}
      <span className="vula-intro__glow vula-intro__glow--back" />
      <span className="vula-intro__glow vula-intro__glow--sun" />
      <span className="vula-intro__glow vula-intro__glow--shaft" />
      <svg ref={markRef} viewBox="0 0 420 500" className="vula-intro__mark" xmlns="http://www.w3.org/2000/svg">
        <path
          className="vula-intro__panel vula-intro__panel--left"
          style={{ transform: "translate3d(50px,0,0)", transformBox: "fill-box", transformOrigin: "center center" }}
          d="M160 90L0 0V416.667L160 500V90Z"
          fill="#F8FAFC"
        />
        <path
          className="vula-intro__panel vula-intro__panel--right"
          style={{ transform: "translate3d(-50px,0,0)", transformBox: "fill-box", transformOrigin: "center center" }}
          d="M260 90L420 0V416.667L260 500V90Z"
          fill="#01A1B7"
        />
      </svg>
      {/* Floor spill sits below the door base, so nothing occludes it */}
      <span className="vula-intro__glow vula-intro__glow--spill" />
      {/* Soft camera-glare bloom along the open seam — very diffuse, arrives late */}
      <span className="vula-intro__glow vula-intro__glow--bloom" />
    </div>
  );
}

export function BrandIntro({ skip = false }: { skip?: boolean }) {
  const [state, setState] = useState<IntroState>("waiting");
  const [transform, setTransform] = useState<IntroTransform | null>(null);
  const contentRef = useRef<HTMLDivElement | null>(null);
  const markRef = useRef<SVGSVGElement | null>(null);

  useEffect(() => {
    if (typeof window === "undefined") return;

    const updateTransform = () => {
      const introContent = contentRef.current;
      const introMark = markRef.current;
      const target = getVisibleIntroTarget();

      if (!introContent || !introMark || !target) {
        setTransform((prev) => (prev === null ? prev : null));
        return;
      }

      const contentRect = introContent.getBoundingClientRect();
      const markRect = introMark.getBoundingClientRect();
      const targetRect = target.getBoundingClientRect();

      const x = targetRect.left + targetRect.width / 2 - (contentRect.left + contentRect.width / 2);
      const y = targetRect.top + targetRect.height / 2 - (contentRect.top + contentRect.height / 2);
      const scale = Math.max(0.28, Math.min(0.65, targetRect.width / markRect.width));

      // Skip redundant updates — the ResizeObserver fires an immediate callback on observe,
      // and an extra re-render right as the intro starts is enough to cause a visible hitch.
      setTransform((prev) => {
        if (prev && prev.x === x && prev.y === y && prev.scale === scale) return prev;
        return { x, y, scale };
      });
    };

    updateTransform();

    const resizeObserver = new ResizeObserver(() => updateTransform());
    const target = getVisibleIntroTarget();
    const introContent = contentRef.current;

    if (target) resizeObserver.observe(target);
    if (introContent) resizeObserver.observe(introContent);

    window.addEventListener("resize", updateTransform);
    window.addEventListener("orientationchange", updateTransform);

    return () => {
      resizeObserver.disconnect();
      window.removeEventListener("resize", updateTransform);
      window.removeEventListener("orientationchange", updateTransform);
    };
  }, []);

  useEffect(() => {
    if (typeof window === "undefined") return;

    // The intro is a once-per-visit moment: homepage only, first load of this tab session.
    // (The inline guard script already hid the overlay pre-paint in the skip cases;
    // this just unmounts it properly.)
    if (!shouldPlayIntro()) {
      setState("hidden");
      return;
    }

    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (reducedMotion) {
      setState("hidden");
      return;
    }

    markIntroPlayed();

    let hideTimeout = 0;
    let rafA = 0;
    let rafB = 0;
    let fallback = 0;
    let started = false;
    let cancelled = false;

    const begin = () => {
      if (started || cancelled) return;
      started = true;

      // Wait two frames so React's hydration commit (and any font-swap reflow) flushes
      // before the first animation frame. Starting mid-hydration is what dropped frames
      // and produced the start-jerk on a real page load.
      rafA = window.requestAnimationFrame(() => {
        rafB = window.requestAnimationFrame(() => {
          if (cancelled) return;
          setState("playing");
          hideTimeout = window.setTimeout(() => setState("hidden"), 2320);
        });
      });
    };

    // Prefer to start once webfonts have settled (so a font swap doesn't repaint the page
    // mid-animation), but never hold the dark frame longer than 120ms.
    const fontsReady = document.fonts?.ready;
    if (fontsReady) {
      fontsReady.then(begin);
      fallback = window.setTimeout(begin, 120);
    } else {
      begin();
    }

    return () => {
      cancelled = true;
      window.cancelAnimationFrame(rafA);
      window.cancelAnimationFrame(rafB);
      window.clearTimeout(hideTimeout);
      window.clearTimeout(fallback);
    };
  }, []);

  if (skip || state === "hidden") return null;

  const style = {
    "--intro-target-x": transform ? `${transform.x}px` : undefined,
    "--intro-target-y": transform ? `${transform.y}px` : undefined,
    "--intro-target-scale": transform ? `${transform.scale}` : undefined,
  } as CSSProperties;

  return (
    <div
      aria-hidden="true"
      className={`vula-intro ${state === "playing" ? "is-playing" : "is-waiting"} fixed inset-0 z-[100] overflow-hidden`}
      style={style}
    >
      <script dangerouslySetInnerHTML={{ __html: INTRO_GUARD_SCRIPT }} />
      <div className="vula-intro__veil" />
      <div className="vula-intro__wash" />
      <div className="vula-intro__content-shell">
        <div ref={contentRef} className="vula-intro__content">
          <IntroMark markRef={markRef} />
        </div>
      </div>

      <style>{`
        [data-vula-intro-skip] .vula-intro {
          display: none !important;
        }
        .vula-intro {
          --intro-target-x: calc(-50vw + 6.3rem);
          --intro-target-y: calc(-50vh + 3rem);
          --intro-target-scale: 0.46;
          background: #111922;
          pointer-events: auto;
          opacity: 1;
        }
        /* Promote the animated layers up-front (in both waiting and playing states) so the
           browser is not creating GPU layers on the very frame the animation begins. */
        .vula-intro__veil,
        .vula-intro__wash,
        .vula-intro__content-shell,
        .vula-intro__content,
        .vula-intro__panel,
        .vula-intro__glow {
          will-change: transform, opacity, filter;
        }
        .vula-intro__veil {
          position: absolute;
          inset: 0;
          background:
            radial-gradient(68rem 42rem at 50% 30%, rgba(255, 214, 150, 0.07), transparent 54%),
            radial-gradient(44rem 28rem at 50% 50%, rgba(15, 23, 42, 0.18), transparent 68%),
            linear-gradient(180deg, rgba(17, 25, 34, 0.985), rgba(10, 15, 22, 0.96));
          backdrop-filter: blur(6px);
        }
        .vula-intro__wash {
          position: absolute;
          inset: -10%;
          background: radial-gradient(circle at 50% 44%, rgba(255, 224, 168, 0.2) 0%, rgba(255, 198, 126, 0.1) 24%, rgba(255, 198, 126, 0) 52%);
          opacity: 0;
          transform: scale(0.9);
        }
        .vula-intro__content-shell {
          position: absolute;
          inset: 0;
          display: grid;
          place-items: center;
        }
        .vula-intro__content {
          transform: translate3d(0, 0, 0) scale(1);
        }
        .vula-intro__mark-wrap {
          position: relative;
          width: 8.4rem;
          height: 10.2rem;
          display: grid;
          place-items: center;
        }
        .vula-intro__mark {
          position: relative;
          z-index: 3;
          width: 5rem;
          height: auto;
          overflow: visible;
          transform: translateZ(0);
        }
        .vula-intro__panel {
          transform-box: fill-box;
          transform-origin: center center;
        }
        .vula-intro__glow {
          position: absolute;
          pointer-events: none;
          opacity: 0;
        }
        /* Soft warm halo behind everything — ambient room fill */
        .vula-intro__glow--back {
          inset: -5% -5% -5% -5%;
          z-index: 1;
          background: radial-gradient(
            ellipse 72% 68% at 50% 55%,
            rgba(255, 185, 45, 0.15) 0%,
            rgba(255, 150, 18, 0.07) 44%,
            transparent 72%
          );
          filter: blur(40px);
          transform: scale(0.5);
        }
        /* The sun itself: an intense warm disc at mid-door height, BEHIND the panels.
           The parting doors reveal it naturally — first a crack, then a blaze. */
        .vula-intro__glow--sun {
          left: 50%;
          bottom: 3.7rem;
          z-index: 2;
          width: 3.4rem;
          height: 2.8rem;
          margin-left: -1.7rem;
          border-radius: 50%;
          transform-origin: center center;
          transform: scale(0.5);
          background: radial-gradient(
            circle at 50% 50%,
            rgba(255, 255, 236, 1) 0%,
            rgba(255, 241, 178, 0.96) 16%,
            rgba(255, 208, 96, 0.62) 42%,
            rgba(255, 166, 42, 0.24) 66%,
            transparent 86%
          );
          filter: blur(5px) brightness(1.8);
        }
        /* Column of light falling from the sun down to the door base — also behind the
           panels, so it reads as light streaming through the open doorway toward the floor */
        .vula-intro__glow--shaft {
          left: 50%;
          bottom: 2rem;
          z-index: 2;
          width: 2.6rem;
          height: 3.1rem;
          margin-left: -1.3rem;
          transform-origin: 50% 0%;
          transform: scaleY(0.06);
          background: radial-gradient(
            ellipse 62% 58% at 50% 0%,
            rgba(255, 248, 205, 0.9) 0%,
            rgba(255, 216, 115, 0.55) 30%,
            rgba(255, 175, 55, 0.26) 56%,
            rgba(255, 135, 20, 0.07) 78%,
            transparent 92%
          );
          filter: blur(5px) brightness(1.4);
        }
        /* V-shaped pool of light fanning across the floor from the doorway base —
           grows as the doors open wider */
        .vula-intro__glow--spill {
          left: 50%;
          bottom: -0.6rem;
          z-index: 2;
          width: 11rem;
          height: 2.7rem;
          margin-left: -5.5rem;
          background: conic-gradient(
            from 0deg at 50% 0%,
            transparent 126deg,
            rgba(255, 234, 186, 0.24) 153deg,
            rgba(255, 240, 200, 0.5) 180deg,
            rgba(255, 234, 186, 0.24) 207deg,
            transparent 234deg,
            transparent 360deg
          );
          -webkit-mask-image: radial-gradient(ellipse 92% 132% at 50% 0%, rgba(0,0,0,0.62) 0%, #000 32%, rgba(0,0,0,0.34) 58%, transparent 80%);
          mask-image: radial-gradient(ellipse 92% 132% at 50% 0%, rgba(0,0,0,0.62) 0%, #000 32%, rgba(0,0,0,0.34) 58%, transparent 80%);
          filter: blur(10px);
          transform-origin: 50% 0%;
          transform: scaleY(0.4);
        }
        /* Glare bloom hugging the open seam — extremely diffuse so it reads as light
           flaring past the door edges, never as an object on the door faces */
        .vula-intro__glow--bloom {
          left: 50%;
          bottom: 2.1rem;
          z-index: 4;
          width: 2.4rem;
          height: 6.1rem;
          margin-left: -1.2rem;
          transform-origin: 50% 60%;
          transform: scale(0.7);
          background: radial-gradient(
            ellipse 46% 52% at 50% 42%,
            rgba(255, 246, 205, 0.52) 0%,
            rgba(255, 214, 120, 0.28) 40%,
            rgba(255, 175, 60, 0.10) 65%,
            transparent 82%
          );
          filter: blur(14px);
        }

        .vula-intro.is-playing {
          animation: vulaIntroDone 200ms ease-in-out 2120ms forwards;
        }
        .vula-intro.is-playing .vula-intro__veil {
          animation: vulaOverlayFade 1700ms ease-in-out 0ms both;
        }
        .vula-intro.is-playing .vula-intro__wash {
          animation: vulaWash 1300ms ease-in-out 60ms both;
        }
        .vula-intro.is-playing .vula-intro__content {
          animation: vulaSettle 900ms cubic-bezier(0.32, 0.06, 0.16, 1) 1240ms both;
        }
        .vula-intro.is-playing .vula-intro__panel--left {
          animation:
            vulaLeftOpen 1140ms cubic-bezier(0.45, 0, 0.2, 1) 60ms both,
            vulaLeftTone 800ms ease-in-out 1240ms both;
        }
        .vula-intro.is-playing .vula-intro__panel--right {
          animation: vulaRightOpen 1140ms cubic-bezier(0.45, 0, 0.2, 1) 60ms both;
        }
        .vula-intro.is-playing .vula-intro__glow--back {
          animation: vulaBackLight 1180ms ease-in-out 60ms both;
        }
        .vula-intro.is-playing .vula-intro__glow--sun {
          animation: vulaSun 1120ms cubic-bezier(0.3, 0, 0.2, 1) 60ms both;
        }
        .vula-intro.is-playing .vula-intro__glow--shaft {
          animation: vulaShaft 1100ms cubic-bezier(0.33, 0, 0.2, 1) 110ms both;
        }
        .vula-intro.is-playing .vula-intro__glow--spill {
          animation: vulaSpill 1000ms cubic-bezier(0.33, 0, 0.2, 1) 220ms both;
        }
        .vula-intro.is-playing .vula-intro__glow--bloom {
          animation: vulaBloom 760ms ease-out 430ms both;
        }

        @keyframes vulaLeftOpen {
          0% { transform: translate3d(50px, 0, 0); }
          100% { transform: translate3d(0, 0, 0); }
        }
        @keyframes vulaRightOpen {
          0% { transform: translate3d(-50px, 0, 0); }
          100% { transform: translate3d(0, 0, 0); }
        }
        @keyframes vulaLeftTone {
          0% { fill: #F8FAFC; }
          58% { fill: #F8FAFC; }
          100% { fill: #0F172A; }
        }
        @keyframes vulaBackLight {
          0%   { opacity: 0;   transform: scale(0.5);  filter: blur(40px) brightness(1.0);  }
          45%  { opacity: 0.6; transform: scale(0.85); filter: blur(36px) brightness(1.35); }
          100% { opacity: 1;   transform: scale(1.1);  filter: blur(28px) brightness(1.55); }
        }
        /* Already burning when the crack first opens, then swells and intensifies */
        @keyframes vulaSun {
          0%   { opacity: 0;    transform: scale(0.5);  filter: blur(4px) brightness(1.6); }
          15%  { opacity: 0.95; transform: scale(0.66); filter: blur(4px) brightness(2.1); }
          60%  { opacity: 1;    transform: scale(0.88); filter: blur(5px) brightness(2.5); }
          100% { opacity: 1;    transform: scale(1);    filter: blur(6px) brightness(2.7); }
        }
        /* Light reaches down from the sun to the floor as the gap widens */
        @keyframes vulaShaft {
          0%   { opacity: 0;    transform: scaleY(0.06); filter: blur(3px) brightness(1.8);  }
          25%  { opacity: 0.8;  transform: scaleY(0.42); filter: blur(4px) brightness(1.6);  }
          65%  { opacity: 0.95; transform: scaleY(0.8);  filter: blur(5px) brightness(1.45); }
          100% { opacity: 1;    transform: scaleY(1);    filter: blur(6px) brightness(1.35); }
        }
        /* The floor pool spreads wider and brighter the more the doors open */
        @keyframes vulaSpill {
          0%   { opacity: 0;    transform: scaleY(0.4);  filter: blur(8px)  brightness(0.95); }
          45%  { opacity: 0.65; transform: scaleY(0.8);  filter: blur(9px)  brightness(1.08); }
          100% { opacity: 1;    transform: scaleY(1);    filter: blur(11px) brightness(1.3);  }
        }
        @keyframes vulaBloom {
          0%   { opacity: 0;    transform: scale(0.7); }
          100% { opacity: 0.55; transform: scale(1);   }
        }
        @keyframes vulaOverlayFade {
          0% { opacity: 1; }
          55% { opacity: 0.72; }
          100% { opacity: 0; }
        }
        @keyframes vulaWash {
          0% { opacity: 0; transform: scale(0.9); }
          46% { opacity: 0.72; }
          100% { opacity: 0.26; transform: scale(1.2); }
        }
        @keyframes vulaSettle {
          0% { transform: translate3d(0, 0, 0) scale(1); opacity: 1; }
          100% {
            transform: translate3d(var(--intro-target-x), var(--intro-target-y), 0) scale(var(--intro-target-scale));
            opacity: 0.08;
          }
        }
        @keyframes vulaIntroDone {
          to { opacity: 0; visibility: hidden; }
        }

        @media (max-width: 767px) {
          .vula-intro {
            --intro-target-x: calc(-50vw + 2.6rem);
            --intro-target-y: calc(-50vh + 2.45rem);
            --intro-target-scale: 0.42;
          }
          .vula-intro__mark-wrap {
            width: 7.2rem;
            height: 8.8rem;
          }
          .vula-intro__mark {
            width: 4.35rem;
          }
          .vula-intro__glow--sun {
            bottom: 3.2rem;
            width: 3rem;
            height: 2.4rem;
            margin-left: -1.5rem;
          }
          .vula-intro__glow--shaft {
            bottom: 1.75rem;
            height: 2.65rem;
          }
          .vula-intro__glow--bloom {
            bottom: 1.8rem;
            height: 5.2rem;
          }
          .vula-intro__glow--spill {
            bottom: -0.5rem;
            width: 9.5rem;
            height: 2.3rem;
            margin-left: -4.75rem;
          }
        }

        @media (prefers-reduced-motion: reduce) {
          .vula-intro {
            display: none;
          }
        }
      `}</style>
    </div>
  );
}
