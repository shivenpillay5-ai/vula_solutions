import { useEffect, useState } from "react";
import { Mark } from "./Logo";

/**
 * One-time premium intro: a hairline of light appears, splits into two
 * door panels that ease outward to reveal the V mark, then VULA fades in.
 * Plays only on first visit per session (and on hard refresh).
 */
export function BrandIntro() {
  const [show, setShow] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") return;
    try {
      if (sessionStorage.getItem("vula_intro_played")) return;
      sessionStorage.setItem("vula_intro_played", "1");
    } catch {
      // ignore
    }
    setShow(true);
    const t = setTimeout(() => setShow(false), 2200);
    return () => clearTimeout(t);
  }, []);

  if (!show) return null;

  return (
    <div
      aria-hidden="true"
      className="vula-intro fixed inset-0 z-[100] flex items-center justify-center"
      style={{ backgroundColor: "#0F1720" }}
    >
      <div className="relative flex flex-col items-center">
        <div className="relative h-24 w-24">
          {/* Hairline of light */}
          <span className="vula-intro__seam" />
          {/* The mark, revealed as doors open */}
          <div className="vula-intro__mark absolute inset-0">
            <Mark className="h-full w-full" variant="light" />
          </div>
          {/* Left/right occluders that slide outward like doors */}
          <span className="vula-intro__door vula-intro__door--left" />
          <span className="vula-intro__door vula-intro__door--right" />
        </div>
        <span
          className="vula-intro__word mt-6 text-2xl font-semibold tracking-[0.28em] text-white"
          style={{ fontFamily: "var(--font-display)" }}
        >
          VULA
        </span>
      </div>

      <style>{`
        .vula-intro { animation: vulaIntroOut 400ms ease 1800ms forwards; }
        .vula-intro__seam {
          position: absolute; top: 8%; bottom: 8%; left: 50%;
          width: 2px; margin-left: -1px; border-radius: 2px;
          background: linear-gradient(180deg, transparent, #2DD4BF, transparent);
          opacity: 0;
          animation: vulaSeam 700ms ease-out forwards;
          box-shadow: 0 0 24px rgba(20,184,166,0.55);
        }
        .vula-intro__mark { opacity: 0; animation: vulaMark 700ms ease-out 650ms forwards; }
        .vula-intro__door {
          position: absolute; top: 0; bottom: 0; width: 50%;
          background: #0F1720;
        }
        .vula-intro__door--left { left: 0; transform-origin: left center;
          animation: vulaDoorLeft 900ms cubic-bezier(0.22,0.61,0.36,1) 550ms forwards; }
        .vula-intro__door--right { right: 0; transform-origin: right center;
          animation: vulaDoorRight 900ms cubic-bezier(0.22,0.61,0.36,1) 550ms forwards; }
        .vula-intro__word { opacity: 0; letter-spacing: 0.5em;
          animation: vulaWord 600ms ease-out 1250ms forwards; }

        @keyframes vulaSeam {
          0% { opacity: 0; transform: scaleY(0.2); }
          60% { opacity: 1; }
          100% { opacity: 1; transform: scaleY(1); }
        }
        @keyframes vulaMark { to { opacity: 1; } }
        @keyframes vulaDoorLeft { to { transform: translateX(-100%); } }
        @keyframes vulaDoorRight { to { transform: translateX(100%); } }
        @keyframes vulaWord {
          to { opacity: 1; letter-spacing: 0.28em; }
        }
        @keyframes vulaIntroOut { to { opacity: 0; visibility: hidden; } }

        @media (prefers-reduced-motion: reduce) {
          .vula-intro { animation: vulaIntroOut 200ms ease 400ms forwards; }
          .vula-intro__seam, .vula-intro__mark, .vula-intro__word,
          .vula-intro__door--left, .vula-intro__door--right {
            animation-duration: 200ms; animation-delay: 0ms;
          }
        }
      `}</style>
    </div>
  );
}