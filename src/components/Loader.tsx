import { useEffect, useState } from 'react';

export default function Loader() {
  const [hidden, setHidden] = useState(false);

  useEffect(() => {
    const prefersReduced = window.matchMedia(
      '(prefers-reduced-motion: reduce)'
    ).matches;

    const timer = setTimeout(
      () => setHidden(true),
      prefersReduced ? 100 : 1800
    );

    return () => clearTimeout(timer);
  }, []);

  if (hidden) return null;

  return (
    <div className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-ink-950 animate-loader-fade">
      {/* Logo mark */}
      <div className="flex items-center gap-3">
        <span className="flex h-12 w-12 items-center justify-center border border-gold-400/60 text-gold-300 animate-scale-in">
          <span className="font-serif text-2xl font-semibold leading-none">L</span>
        </span>
        <span className="font-serif text-2xl font-medium tracking-wide text-cream-50 animate-fade-in">
          LTS WELDING HOUSE
        </span>
      </div>

      {/* Loading line */}
      <div className="mt-8 h-px w-40 overflow-hidden bg-ink-700">
        <div className="h-full w-full origin-left bg-gold-400 animate-line-grow" />
      </div>

      {/* Label */}
      <p className="mt-4 text-xs uppercase tracking-ultra-wide text-cream-100/30 animate-fade-in">
        Loading Experience
      </p>
    </div>
  );
}
