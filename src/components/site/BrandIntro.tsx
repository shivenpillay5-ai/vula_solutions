import { useEffect, useRef, useState, type CSSProperties, type RefObject } from "react";

type IntroState = "waiting" | "playing" | "hidden";

type IntroTransform = {
  x: number;
  y: number;
  scale: number;
};

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
      {/* Warm sunlight streaming through the seam — sits behind the doors and is revealed as they open */}
      <span className="vula-intro__glow vula-intro__glow--seam" />
      <span className="vula-intro__glow vula-intro__glow--back" />
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
      {/* The wedge of light that fans out across the floor from the base of the opening doors */}
      <span className="vula-intro__glow vula-intro__glow--spill" />
      <span className="vula-intro__glow vula-intro__glow--ambient" />
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

    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (reducedMotion) {
      setState("hidden");
      return;
    }

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
          hideTimeout = window.setTimeout(() => setState("hidden"), 2680);
        });
      });
    };

    // Prefer to start once webfonts have settled (so a font swap doesn't repaint the page
    // mid-animation), but never hold the dark frame longer than 180ms.
    const fontsReady = document.fonts?.ready;
    if (fontsReady) {
      fontsReady.then(begin);
      fallback = window.setTimeout(begin, 180);
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
      <div className="vula-intro__veil" />
      <div className="vula-intro__wash" />
      <div className="vula-intro__content-shell">
        <div ref={contentRef} className="vula-intro__content">
          <IntroMark markRef={markRef} />
        </div>
      </div>

      <style>{`
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
        /* The hero light: a warm shaft of morning sun behind the doors. It sits at z-index 2
           (behind the mark at z-index 3), so it is only seen through the widening seam as the
           doors swing open — and it brightens as it grows. */
        .vula-intro__glow--seam {
          left: 50%;
          top: 50%;
          z-index: 2;
          width: 6.5rem;
          height: 8.5rem;
          margin: 0;
          transform: translate(-50%, -50%) scaleX(0.16);
          transform-origin: center center;
          background: radial-gradient(
            ellipse 32% 60% at 50% 50%,
            rgba(255, 250, 236, 0.9) 0%,
            rgba(255, 224, 168, 0.56) 24%,
            rgba(255, 192, 120, 0.24) 48%,
            rgba(255, 164, 88, 0.07) 70%,
            transparent 84%
          );
          filter: blur(13px) brightness(0.85);
        }
        .vula-intro__glow--back {
          inset: 6% 6% 6% 6%;
          z-index: 1;
          background: radial-gradient(ellipse 78% 72% at 50% 46%, rgba(255, 226, 176, 0.09) 0%, rgba(255, 194, 120, 0.045) 46%, rgba(255, 170, 90, 0) 74%);
          filter: blur(60px);
          transform: scale(0.6);
        }
        .vula-intro__glow--ambient {
          left: 50%;
          bottom: 12%;
          z-index: 1;
          width: 20rem;
          height: 5rem;
          margin-left: -10rem;
          border-radius: 999px;
          background: radial-gradient(circle, rgba(255, 214, 150, 0.4) 0%, rgba(255, 184, 104, 0.22) 44%, rgba(255, 184, 104, 0) 78%);
          filter: blur(20px);
          transform: perspective(160px) rotateX(74deg) scale(0.58);
        }
        /* Built entirely from light, not geometry: a conic gradient forms the wedge with soft
           angular falloff, and a radial mask fades it out with distance from the door base — so
           there is no hard edge anywhere, only diffusion, the way real light behaves. */
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
          -webkit-mask-image: radial-gradient(ellipse 92% 128% at 50% 0%, #000 0%, #000 16%, rgba(0, 0, 0, 0.32) 50%, transparent 76%);
          mask-image: radial-gradient(ellipse 92% 128% at 50% 0%, #000 0%, #000 16%, rgba(0, 0, 0, 0.32) 50%, transparent 76%);
          filter: blur(6px);
          transform-origin: 50% 0%;
          transform: scaleY(0.62);
        }

        .vula-intro.is-playing {
          animation: vulaIntroDone 220ms ease-in-out 2460ms forwards;
        }
        .vula-intro.is-playing .vula-intro__veil {
          animation: vulaOverlayFade 1980ms ease-in-out 0ms both;
        }
        .vula-intro.is-playing .vula-intro__wash {
          animation: vulaWash 1520ms ease-in-out 100ms both;
        }
        .vula-intro.is-playing .vula-intro__content {
          animation: vulaSettle 1000ms cubic-bezier(0.32, 0.06, 0.16, 1) 1480ms both;
        }
        .vula-intro.is-playing .vula-intro__panel--left {
          animation:
            vulaLeftOpen 1320ms cubic-bezier(0.45, 0, 0.2, 1) 120ms both,
            vulaLeftTone 920ms ease-in-out 1480ms both;
        }
        .vula-intro.is-playing .vula-intro__panel--right {
          animation: vulaRightOpen 1320ms cubic-bezier(0.45, 0, 0.2, 1) 120ms both;
        }
        .vula-intro.is-playing .vula-intro__glow--seam {
          animation: vulaSeam 1360ms cubic-bezier(0.33, 0, 0.2, 1) 120ms both;
        }
        .vula-intro.is-playing .vula-intro__glow--back {
          animation: vulaBackLight 1360ms ease-in-out 120ms both;
        }
        .vula-intro.is-playing .vula-intro__glow--ambient {
          animation: vulaAmbient 1320ms ease-in-out 100ms both;
        }
        .vula-intro.is-playing .vula-intro__glow--spill {
          animation: vulaSpill 1280ms cubic-bezier(0.33, 0, 0.2, 1) 200ms both;
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
        /* Widen + brighten together: the sun peeks through the crack, then floods in as the doors part. */
        @keyframes vulaSeam {
          0%   { opacity: 0;    transform: translate(-50%, -50%) scaleX(0.16); filter: blur(8px)  brightness(0.82); }
          25%  { opacity: 0.5;  transform: translate(-50%, -50%) scaleX(0.42); filter: blur(11px) brightness(1.05); }
          60%  { opacity: 0.8;  transform: translate(-50%, -50%) scaleX(0.78); filter: blur(16px) brightness(1.32); }
          100% { opacity: 1;    transform: translate(-50%, -50%) scaleX(1);    filter: blur(21px) brightness(1.58); }
        }
        @keyframes vulaBackLight {
          0% { opacity: 0; transform: scale(0.6); filter: blur(30px) brightness(0.9); }
          55% { opacity: 0.7; transform: scale(0.95); filter: blur(34px) brightness(1.16); }
          100% { opacity: 1; transform: scale(1.18); filter: blur(40px) brightness(1.42); }
        }
        @keyframes vulaAmbient {
          0% { opacity: 0; transform: perspective(160px) rotateX(74deg) scale(0.58); filter: blur(20px) brightness(0.96); }
          100% { opacity: 1; transform: perspective(160px) rotateX(74deg) scale(1.08); filter: blur(24px) brightness(1.24); }
        }
        /* The V of light reaching further across the floor as the doors part. */
        @keyframes vulaSpill {
          0%   { opacity: 0;   transform: scaleY(0.5);  filter: blur(5px) brightness(0.95); }
          40%  { opacity: 0.6; transform: scaleY(0.82); filter: blur(6px) brightness(1.05); }
          100% { opacity: 1;   transform: scaleY(1);    filter: blur(7px) brightness(1.22); }
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
