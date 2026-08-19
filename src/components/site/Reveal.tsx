import { useEffect, useRef, useState, type ReactNode } from "react";

/**
 * Scroll-reveal: content fades up as it enters the viewport.
 *
 * SSR-safe: the server-rendered HTML is fully visible. On mount, only
 * elements still below the fold are hidden and observed — anything already
 * on screen (or with reduced motion) is left untouched, so there is
 * never a flash of hidden content.
 */
export function useReveal() {
  const ref = useRef<HTMLDivElement | null>(null);
  const [hidden, setHidden] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    // Already in view at mount — leave it visible, no animation.
    if (el.getBoundingClientRect().top < window.innerHeight * 0.92) return;

    setHidden(true);
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries.some((entry) => entry.isIntersecting)) {
          setHidden(false);
          observer.disconnect();
        }
      },
      { threshold: 0.12 },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return {
    ref,
    className: `transition-[opacity,transform] duration-700 ease-out ${
      hidden ? "translate-y-5 opacity-0" : "translate-y-0 opacity-100"
    }`,
  };
}

export function Reveal({ children, className = "" }: { children: ReactNode; className?: string }) {
  const reveal = useReveal();
  return (
    <div ref={reveal.ref} className={`${reveal.className} ${className}`}>
      {children}
    </div>
  );
}
