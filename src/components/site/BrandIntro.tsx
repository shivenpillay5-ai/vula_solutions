import { useEffect, useState } from "react";

type IntroState = "pending" | "playing" | "hidden";

function IntroMark() {
  return (
    <div className="vula-intro__mark-wrap" aria-hidden="true">
      <svg viewBox="0 0 420 500" className="vula-intro__mark" xmlns="http://www.w3.org/2000/svg">
        <path className="vula-intro__panel vula-intro__panel--left" d="M160 90L0 0V416.667L160 500V90Z" fill="#F8FAFC" />
        <path className="vula-intro__panel vula-intro__panel--right" d="M260 90L420 0V416.667L260 500V90Z" fill="#01A1B7" />
      </svg>
      <span className="vula-intro__glow vula-intro__glow--back" />
      <span className="vula-intro__glow vula-intro__glow--beam" />
      <span className="vula-intro__glow vula-intro__glow--ambient" />
    </div>
  );
}

export function BrandIntro() {
  const [state, setState] = useState<IntroState>("pending");

  useEffect(() => {
    if (typeof window === "undefined") return;

    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    let shouldPlay = !reducedMotion;
    try {
      shouldPlay = shouldPlay && !sessionStorage.getItem("vula_intro_played");
      if (shouldPlay) {
        sessionStorage.setItem("vula_intro_played", "1");
      }
    } catch {
      shouldPlay = !reducedMotion;
    }

    if (!shouldPlay) {
      setState("hidden");
      return;
    }

    const previousOverflow = document.body.style.overflow;
    const previousPaddingRight = document.body.style.paddingRight;
    const scrollbarCompensation = window.innerWidth - document.documentElement.clientWidth;

    document.body.style.overflow = "hidden";
    if (scrollbarCompensation > 0) {
      document.body.style.paddingRight = `${scrollbarCompensation}px`;
    }

    let hideTimeout = 0;
    let frameOne = 0;
    let frameTwo = 0;

    frameOne = window.requestAnimationFrame(() => {
      frameTwo = window.requestAnimationFrame(() => {
        setState("playing");
        hideTimeout = window.setTimeout(() => {
          setState("hidden");
          document.body.style.overflow = previousOverflow;
          document.body.style.paddingRight = previousPaddingRight;
        }, 2460);
      });
    });

    return () => {
      window.cancelAnimationFrame(frameOne);
      window.cancelAnimationFrame(frameTwo);
      window.clearTimeout(hideTimeout);
      document.body.style.overflow = previousOverflow;
      document.body.style.paddingRight = previousPaddingRight;
    };
  }, []);

  if (state === "hidden") return null;

  return (
    <div
      aria-hidden="true"
      className={`vula-intro fixed inset-0 z-[100] overflow-hidden ${state === "playing" ? "is-playing" : "is-pending"}`}
    >
      <div className="vula-intro__veil" />
      <div className="vula-intro__wash" />
      <div className="vula-intro__content-shell">
        <div className="vula-intro__content">
          <IntroMark />
        </div>
      </div>

      <style>{`
        .vula-intro {
          background: #06090d;
          pointer-events: auto;
        }
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
            radial-gradient(80rem 48rem at 50% 18%, rgba(255, 244, 214, 0.04), transparent 52%),
            linear-gradient(180deg, rgba(6, 9, 13, 0.985), rgba(8, 12, 18, 0.94));
          backdrop-filter: blur(7px);
        }
        .vula-intro__wash {
          position: absolute;
          inset: -10%;
          background: radial-gradient(circle at 50% 42%, rgba(255, 241, 205, 0.18) 0%, rgba(255, 231, 173, 0.08) 18%, rgba(255, 231, 173, 0) 48%);
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
        .vula-intro__panel--left {
          transform: translate3d(50px, 0, 0);
        }
        .vula-intro__panel--right {
          transform: translate3d(-50px, 0, 0);
        }
        .vula-intro__glow {
          position: absolute;
          pointer-events: none;
          opacity: 0;
        }
        .vula-intro__glow--back {
          inset: 18% 20% 22% 20%;
          z-index: 1;
          border-radius: 999px;
          background: radial-gradient(circle, rgba(255, 246, 218, 0.34) 0%, rgba(255, 231, 179, 0.16) 40%, rgba(255, 231, 179, 0) 76%);
          filter: blur(20px);
          transform: scale(0.55);
        }
        .vula-intro__glow--beam {
          left: 50%;
          top: 19%;
          z-index: 2;
          width: 10.2rem;
          height: 8rem;
          margin-left: -5.1rem;
          background: linear-gradient(180deg, rgba(255, 251, 234, 0.08) 0%, rgba(255, 245, 211, 0.34) 18%, rgba(255, 235, 180, 0.82) 48%, rgba(255, 225, 150, 0.24) 74%, rgba(255, 225, 150, 0) 100%);
          clip-path: polygon(49.1% 0%, 50.9% 0%, 79% 100%, 21% 100%);
          filter: blur(9px);
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
          background: radial-gradient(circle, rgba(255, 241, 205, 0.32) 0%, rgba(255, 228, 167, 0.14) 44%, rgba(255, 228, 167, 0) 78%);
          filter: blur(18px);
          transform: perspective(160px) rotateX(74deg) scale(0.58);
        }

        .vula-intro.is-playing {
          animation: vulaIntroDone 220ms ease-in-out 2240ms forwards;
        }
        .vula-intro.is-playing .vula-intro__veil {
          animation: vulaOverlayFade 2260ms ease-in-out forwards;
        }
        .vula-intro.is-playing .vula-intro__wash {
          animation: vulaWash 1680ms ease-in-out 260ms forwards;
        }
        .vula-intro.is-playing .vula-intro__content {
          animation: vulaSettle 980ms cubic-bezier(0.45, 0, 0.2, 1) 1320ms forwards;
        }
        .vula-intro.is-playing .vula-intro__panel--left {
          animation: vulaLeftOpen 1260ms cubic-bezier(0.45, 0, 0.2, 1) 260ms forwards;
        }
        .vula-intro.is-playing .vula-intro__panel--right {
          animation: vulaRightOpen 1260ms cubic-bezier(0.45, 0, 0.2, 1) 260ms forwards;
        }
        .vula-intro.is-playing .vula-intro__glow--back {
          animation: vulaBackLight 1420ms ease-in-out 240ms forwards;
        }
        .vula-intro.is-playing .vula-intro__glow--beam {
          animation: vulaBeam 1500ms ease-in-out 290ms forwards;
        }
        .vula-intro.is-playing .vula-intro__glow--ambient {
          animation: vulaAmbient 1380ms ease-in-out 420ms forwards;
        }

        @keyframes vulaLeftOpen {
          0% { transform: translate3d(50px, 0, 0); }
          16% { transform: translate3d(50px, 0, 0); }
          100% { transform: translate3d(0, 0, 0); }
        }
        @keyframes vulaRightOpen {
          0% { transform: translate3d(-50px, 0, 0); }
          16% { transform: translate3d(-50px, 0, 0); }
          100% { transform: translate3d(0, 0, 0); }
        }
        @keyframes vulaBackLight {
          0% { opacity: 0; transform: scale(0.55); }
          20% { opacity: 0; transform: scale(0.55); }
          62% { opacity: 0.82; }
          100% { opacity: 0.92; transform: scale(1.08); }
        }
        @keyframes vulaBeam {
          0% { opacity: 0; transform: translateY(10px) scaleY(0.08); }
          20% { opacity: 0; transform: translateY(10px) scaleY(0.08); }
          46% { opacity: 0.28; }
          100% { opacity: 0.95; transform: translateY(0) scaleY(1); }
        }
        @keyframes vulaAmbient {
          0% { opacity: 0; transform: perspective(160px) rotateX(74deg) scale(0.58); }
          100% { opacity: 1; transform: perspective(160px) rotateX(74deg) scale(1); }
        }
        @keyframes vulaOverlayFade {
          0% { opacity: 1; backdrop-filter: blur(7px); }
          55% { opacity: 0.78; }
          100% { opacity: 0; backdrop-filter: blur(0px); }
        }
        @keyframes vulaWash {
          0% { opacity: 0; transform: scale(0.9); }
          50% { opacity: 0.72; }
          100% { opacity: 0.22; transform: scale(1.18); }
        }
        @keyframes vulaSettle {
          0% { transform: translate3d(0, 0, 0) scale(1); opacity: 1; }
          100% { transform: translate3d(calc(-50vw + 6.3rem), calc(-50vh + 3rem), 0) scale(0.46); opacity: 0.08; }
        }
        @keyframes vulaIntroDone {
          to { opacity: 0; visibility: hidden; }
        }

        @media (max-width: 767px) {
          .vula-intro__mark-wrap {
            width: 7.2rem;
            height: 8.8rem;
          }
          .vula-intro__mark {
            width: 4.35rem;
          }
          @keyframes vulaSettle {
            0% { transform: translate3d(0, 0, 0) scale(1); opacity: 1; }
            100% { transform: translate3d(calc(-50vw + 2.6rem), calc(-50vh + 2.45rem), 0) scale(0.42); opacity: 0.08; }
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
