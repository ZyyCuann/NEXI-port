'use client';

import { useEffect, useRef, useState } from 'react';

interface TypingIntroProps {
  label: string;
  headline: string;
  subheadline: string;
  className?: string;
}

export function TypingIntro({ label, headline, subheadline, className = '' }: TypingIntroProps) {
  const rootRef = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  const [displayed, setDisplayed] = useState(headline);
  const [done, setDone] = useState(true);
  const hasAnimatedRef = useRef(false);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (prefersReducedMotion) {
      setDisplayed(headline);
      setDone(true);
      hasAnimatedRef.current = true;
      return;
    }

    const node = rootRef.current;
    if (!node) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasAnimatedRef.current) {
          setVisible(true);
          hasAnimatedRef.current = true;
        }
      },
      { threshold: 0.35 }
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, [headline]);

  useEffect(() => {
    if (!visible) return;

    setDisplayed('');
    setDone(false);

    let index = 0;
    const timer = setInterval(() => {
      index += 1;
      setDisplayed(headline.slice(0, index));

      if (index >= headline.length) {
        clearInterval(timer);
        setDone(true);
      }
    }, 32);

    return () => clearInterval(timer);
  }, [headline, visible]);

  return (
    <div ref={rootRef} className={`max-w-3xl mb-12 md:mb-16 ${className}`}>
      <span className="inline-flex items-center px-3.5 py-1 text-xs font-bold tracking-wider uppercase rounded-full bg-blue-500/10 text-blue-600 dark:bg-cyan-500/10 dark:text-cyan-400 mb-4 transition-colors duration-300">
        {label}
      </span>
      <h2 className="min-h-[2.4em] text-3xl md:text-5xl font-heading font-extrabold text-slate-900 dark:text-white tracking-tight mb-4 transition-colors duration-300 bg-gradient-to-r from-slate-900 to-slate-700 dark:from-white dark:to-slate-300 bg-clip-text text-transparent">
        {displayed}
        {!done && (
          <span className="ml-1 inline-block h-[0.9em] w-px translate-y-1 bg-blue-500 dark:bg-cyan-300 animate-cursor-blink" />
        )}
      </h2>
      <p className={`text-base md:text-lg text-slate-600 dark:text-slate-400 leading-relaxed transition-all duration-500 ${done ? 'opacity-100 translate-y-0 delay-300' : 'opacity-0 translate-y-2'}`}>
        {subheadline}
      </p>
    </div>
  );
}
