'use client';

import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import type { LucideIcon } from 'lucide-react';
import { cn } from '@/lib/utils';

interface AnimatedCounterProps {
  label: string;
  icon: LucideIcon;
  className?: string;
}

export default function AnimatedCounter({
  label,
  icon: Icon,
  className,
}: AnimatedCounterProps) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-40px' });

  return (
    <motion.div
      ref={ref}
      className={cn(
        'inline-flex items-center gap-3',
        'bg-white/80 dark:bg-white/5',
        'backdrop-blur-lg',
        'border border-slate-200/50 dark:border-white/10',
        'rounded-xl px-5 py-3',
        'shadow-sm shadow-black/5 dark:shadow-black/20',
        className
      )}
      initial={{ opacity: 0, y: 16, scale: 0.95 }}
      animate={
        isInView
          ? { opacity: 1, y: 0, scale: 1 }
          : { opacity: 0, y: 16, scale: 0.95 }
      }
      transition={{
        duration: 0.5,
        ease: [0.25, 0.46, 0.45, 0.94],
      }}
    >
      <Icon
        size={20}
        className="text-blue-500 flex-shrink-0"
        aria-hidden="true"
      />
      <span className="text-sm font-medium text-slate-700 dark:text-slate-300 whitespace-nowrap">
        {label}
      </span>
    </motion.div>
  );
}
