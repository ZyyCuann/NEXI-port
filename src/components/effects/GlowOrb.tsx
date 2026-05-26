'use client';

import { cn } from '@/lib/utils';

interface GlowOrbProps {
  className?: string;
  color?: 'blue' | 'cyan' | 'violet';
  size?: 'sm' | 'md' | 'lg';
}

const sizeMap = {
  sm: 'w-[200px] h-[200px]',
  md: 'w-[400px] h-[400px]',
  lg: 'w-[600px] h-[600px]',
} as const;

const colorMap = {
  blue: 'bg-blue-500/20',
  cyan: 'bg-cyan-500/20',
  violet: 'bg-violet-500/20',
} as const;

export default function GlowOrb({
  className,
  color = 'blue',
  size = 'md',
}: GlowOrbProps) {
  return (
    <div
      className={cn(
        'absolute rounded-full',
        'blur-3xl',
        'pointer-events-none',
        'animate-float-slow',
        sizeMap[size],
        colorMap[color],
        className
      )}
      aria-hidden="true"
    />
  );
}
