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
      <span className="vula-intro__glow vula-intro__glow--back" />
      <span className="vula-intro__glow vula-intro__glow--beam" />
      <span className="vula-intro__glow vula-intro__glow--ambient" />
    </div>
  );
}

export function BrandIntro() {
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
        setTransform(null);
        return;
      }

      const contentRect = introContent.getBoundingClientRect();
      const markRect = introMark.getBoundingClientRect();
      const targetRect = target.getBoundingClientRect();

      const x = targetRect.left + targetRect.width / 2 - (contentRect.left + contentRect.width / 2);
      const y = targetRect.top + targetRect.height / 2 - (contentRect.top + contentRect.height / 2);
      const scale = Math.max(0.28, Math.min(0.65, targetRect.width / markRect.width));

      setTransform({ x, y, scale });
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
    const startFrame = window.requestAnimationFrame(() => {
      setState("playing");
      hideTimeout = window.setTimeout(() => {
        setState("hidden");
      }, 2680);
    });

    return () => {
      window.cancelAnimationFrame(startFrame);
      window.clearTimeout(hideTimeout);
    };
  }, []);

  if (state === "hidden") return null;

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
        .vula-intro.is-playing {
          opacity: 1;
        }
        .vula-intro.is-playing .vula-intro__veil,
        .vula-intro.is-playing .vula-intro__wash,
        .vula-intro.is-playing .vula-intro__content-shell,
        .vula-intro.is-playing .vula-intro__content,
        .vula-intro.is-playing .vula-intro__panel,
        .vula-intro.is-playing .vula-intro__glow {
          will-change: transform, opacity, filter;
        }
        .vula-intro__veil {
          position: absolute;
          inset: 0;
          background:
            radial-gradient(68rem 42rem at 50% 34%, rgba(255, 247, 229, 0.08), transparent 54%),
            radial-gradient(44rem 28rem at 50% 50%, rgba(15, 23, 42, 0.18), transparent 68%),
            linear-gradient(180deg, rgba(17, 25, 34, 0.985), rgba(10, 15, 22, 0.96));
          backdrop-filter: blur(7px);
        }
        .vula-intro__wash {
          position: absolute;
          inset: -10%;
          background: radial-gradient(circle at 50% 42%, rgba(255, 248, 233, 0.22) 0%, rgba(255, 243, 222, 0.12) 22%, rgba(255, 243, 222, 0) 50%);
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
        .vula-intro__glow--back {
          inset: 16% 18% 20% 18%;
          z-index: 1;
          border-radius: 999px;
          background: radial-gradient(circle, rgba(255, 250, 240, 0.42) 0%, rgba(255, 244, 222, 0.3) 34%, rgba(255, 238, 204, 0.12) 58%, rgba(255, 238, 204, 0) 80%);
          filter: blur(22px);
          transform: scale(0.5);
        }
        .vula-intro__glow--beam {
          left: 50%;
          top: 18%;
          z-index: 2;
          width: 10.6rem;
          height: 8.6rem;
          margin-left: -5.3rem;
          background: linear-gradient(180deg, rgba(255, 252, 244, 0.12) 0%, rgba(255, 249, 235, 0.42) 18%, rgba(255, 245, 228, 0.92) 48%, rgba(255, 241, 220, 0.72) 70%, rgba(255, 237, 210, 0.16) 90%, rgba(255, 237, 210, 0) 100%);
          clip-path: polygon(49.1% 0%, 50.9% 0%, 79% 100%, 21% 100%);
          filter: blur(10px) brightness(1);
          transform: translateY(10px) scaleY(0.08);
        }
        .vula-intro__glow--ambient {
          left: 50%;
          bottom: 13%;
          z-index: 1;
          width: 14rem;
          height: 3.6rem;
          margin-left: -7rem;
          border-radius: 999px;
          background: radial-gradient(circle, rgba(255, 247, 232, 0.38) 0%, rgba(255, 241, 219, 0.22) 44%, rgba(255, 241, 219, 0) 78%);
          filter: blur(20px);
          transform: perspective(160px) rotateX(74deg) scale(0.58);
        }

        .vula-intro.is-playing {
          animation: vulaIntroDone 220ms ease-in-out 2460ms forwards;
        }
        .vula-intro.is-playing .vula-intro__veil {
          animation: vulaOverlayFade 1980ms ease-in-out 300ms both;
        }
        .vula-intro.is-playing .vula-intro__wash {
          animation: vulaWash 1520ms ease-in-out 420ms both;
        }
        .vula-intro.is-playing .vula-intro__content {
          animation: vulaSettle 1000ms cubic-bezier(0.32, 0.06, 0.16, 1) 1480ms both;
        }
        .vula-intro.is-playing .vula-intro__panel--left {
          animation:
            vulaLeftOpen 1320ms cubic-bezier(0.45, 0, 0.2, 1) 300ms both,
            vulaLeftTone 920ms ease-in-out 1480ms both;
        }
        .vula-intro.is-playing .vula-intro__panel--right {
          animation: vulaRightOpen 1320ms cubic-bezier(0.45, 0, 0.2, 1) 300ms both;
        }
        .vula-intro.is-playing .vula-intro__glow--back {
          animation: vulaBackLight 1360ms ease-in-out 300ms both;
        }
        .vula-intro.is-playing .vula-intro__glow--beam {
          animation: vulaBeam 1420ms ease-in-out 320ms both;
        }
        .vula-intro.is-playing .vula-intro__glow--ambient {
          animation: vulaAmbient 1320ms ease-in-out 420ms both;
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
          0% { opacity: 0; transform: scale(0.5); filter: blur(22px) brightness(0.92); }
          45% { opacity: 0.72; transform: scale(0.84); filter: blur(24px) brightness(1.08); }
          78% { opacity: 0.94; transform: scale(1.08); filter: blur(28px) brightness(1.28); }
          100% { opacity: 1; transform: scale(1.22); filter: blur(32px) brightness(1.5); }
        }
        @keyframes vulaBeam {
          0% { opacity: 0; transform: translateY(10px) scaleY(0.08); filter: blur(10px) brightness(0.88); }
          38% { opacity: 0.42; filter: blur(11px) brightness(1.02); }
          74% { opacity: 0.88; filter: blur(12px) brightness(1.3); }
          100% { opacity: 1; transform: translateY(0) scaleY(1); filter: blur(14px) brightness(1.58); }
        }
        @keyframes vulaAmbient {
          0% { opacity: 0; transform: perspective(160px) rotateX(74deg) scale(0.58); filter: blur(20px) brightness(0.96); }
          100% { opacity: 1; transform: perspective(160px) rotateX(74deg) scale(1.08); filter: blur(24px) brightness(1.24); }
        }
        @keyframes vulaOverlayFade {
          0% { opacity: 1; backdrop-filter: blur(7px); }
          55% { opacity: 0.76; }
          100% { opacity: 0; backdrop-filter: blur(0px); }
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
