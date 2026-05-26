'use client';

import { motion } from 'framer-motion';
import { type ReactNode } from 'react';

interface GlassCardProps {
  children: ReactNode;
  className?: string;
  hover?: boolean;
  glow?: boolean;
}

export function GlassCard({ children, className = '', hover = false, glow = false }: GlassCardProps) {
  return (
    <motion.div
      className={`
        rounded-2xl border border-slate-200 dark:border-white/10
        bg-white/70 dark:bg-white/5 backdrop-blur-xl
        p-6 md:p-8
        ${hover ? 'transition-all duration-300 hover:border-blue-500/30 hover:bg-white/80 dark:hover:bg-white/10 hover:-translate-y-1' : ''}
        ${glow ? 'shadow-[0_0_30px_rgba(59,130,246,0.15)]' : ''}
        ${className}
      `}
      whileHover={hover ? { scale: 1.02 } : undefined}
    >
      {children}
    </motion.div>
  );
}
