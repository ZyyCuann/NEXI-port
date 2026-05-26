'use client';

import { cn } from '@/lib/utils';

interface GridBackgroundProps {
  children?: React.ReactNode;
  className?: string;
}

export default function GridBackground({
  children,
  className,
}: GridBackgroundProps) {
  return (
    <div
      className={cn('absolute inset-0 pointer-events-none', className)}
      aria-hidden="true"
    >
      {/* Grid pattern layer */}
      <div className="absolute inset-0 grid-pattern opacity-40 dark:opacity-20" />

      {/* Radial gradient overlay to fade edges */}
      <div
        className="absolute inset-0"
        style={{
          background:
            'radial-gradient(ellipse 80% 60% at 50% 50%, transparent 30%, var(--grid-fade-color, rgba(3, 7, 18, 1)) 100%)',
        }}
      />

      {/* Light mode fade override */}
      <div
        className="absolute inset-0 dark:hidden"
        style={{
          background:
            'radial-gradient(ellipse 80% 60% at 50% 50%, transparent 30%, rgba(255, 255, 255, 1) 100%)',
        }}
      />

      {children}
    </div>
  );
}
