'use client';

import { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '@/lib/utils';

interface FloatingNavSection {
  id: string;
  label: string;
}

interface FloatingNavProps {
  sections: FloatingNavSection[];
}

export default function FloatingNav({ sections }: FloatingNavProps) {
  const [activeSection, setActiveSection] = useState<string>(
    sections[0]?.id ?? ''
  );
  const [hoveredSection, setHoveredSection] = useState<string | null>(null);

  useEffect(() => {
    if (sections.length === 0) return;

    const observerMap = new Map<string, IntersectionObserverEntry>();

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          observerMap.set(entry.target.id, entry);
        }

        // Find the section most visible in the viewport
        let maxRatio = 0;
        let maxId = activeSection;

        for (const [id, entry] of observerMap.entries()) {
          if (entry.isIntersecting && entry.intersectionRatio > maxRatio) {
            maxRatio = entry.intersectionRatio;
            maxId = id;
          }
        }

        // Fallback: if none are intersecting with a high ratio,
        // find the one closest to the top
        if (maxRatio === 0) {
          let minTop = Infinity;
          for (const [id, entry] of observerMap.entries()) {
            const top = Math.abs(entry.boundingClientRect.top);
            if (top < minTop) {
              minTop = top;
              maxId = id;
            }
          }
        }

        setActiveSection(maxId);
      },
      {
        threshold: [0, 0.1, 0.25, 0.5, 0.75, 1],
        rootMargin: '-10% 0px -10% 0px',
      }
    );

    const elements: Element[] = [];
    for (const section of sections) {
      const el = document.getElementById(section.id);
      if (el) {
        observer.observe(el);
        elements.push(el);
      }
    }

    return () => {
      for (const el of elements) {
        observer.unobserve(el);
      }
      observer.disconnect();
    };
  }, [sections, activeSection]);

  const scrollToSection = useCallback((id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }, []);

  if (sections.length === 0) return null;

  return (
    <nav
      className={cn(
        'fixed right-8 top-1/2 -translate-y-1/2 z-50',
        'hidden md:flex flex-col items-end gap-5'
      )}
      aria-label="Page sections"
    >
      {sections.map((section) => {
        const isActive = activeSection === section.id;
        const isHovered = hoveredSection === section.id;

        return (
          <div
            key={section.id}
            className="relative flex items-center justify-end"
            onMouseEnter={() => setHoveredSection(section.id)}
            onMouseLeave={() => setHoveredSection(null)}
          >
            {/* Label tooltip */}
            <AnimatePresence>
              {isHovered && (
                <motion.span
                  className={cn(
                    'absolute right-7 whitespace-nowrap',
                    'text-xs font-medium tracking-wide',
                    'text-slate-700 dark:text-slate-300',
                    'bg-white/90 dark:bg-white/10',
                    'backdrop-blur-md',
                    'border border-slate-200/50 dark:border-white/10',
                    'rounded-lg px-3 py-1.5',
                    'shadow-lg shadow-black/5 dark:shadow-black/20'
                  )}
                  initial={{ opacity: 0, x: 8, scale: 0.9 }}
                  animate={{ opacity: 1, x: 0, scale: 1 }}
                  exit={{ opacity: 0, x: 8, scale: 0.9 }}
                  transition={{ duration: 0.15, ease: 'easeOut' }}
                >
                  {section.label}
                </motion.span>
              )}
            </AnimatePresence>

            {/* Dot */}
            <button
              type="button"
              onClick={() => scrollToSection(section.id)}
              className={cn(
                'relative w-3 h-3 rounded-full transition-all duration-300',
                'focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2',
                'dark:focus-visible:ring-offset-gray-900',
                isActive
                  ? 'bg-blue-500 shadow-[0_0_10px_rgba(59,130,246,0.6)]'
                  : 'bg-slate-400 dark:bg-slate-600 hover:bg-slate-500 dark:hover:bg-slate-500'
              )}
              aria-label={`Scroll to ${section.label}`}
              aria-current={isActive ? 'true' : undefined}
            >
              {/* Active glow ring */}
              {isActive && (
                <motion.span
                  className="absolute inset-0 rounded-full bg-blue-500/30"
                  initial={{ scale: 1 }}
                  animate={{ scale: 2, opacity: 0 }}
                  transition={{
                    duration: 1.5,
                    repeat: Infinity,
                    ease: 'easeOut',
                  }}
                />
              )}
            </button>
          </div>
        );
      })}
    </nav>
  );
}
