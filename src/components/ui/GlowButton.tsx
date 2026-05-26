'use client';

import { motion } from 'framer-motion';
import { type ReactNode } from 'react';

interface GlowButtonProps {
  children: ReactNode;
  variant?: 'primary' | 'secondary';
  onClick?: () => void;
  href?: string;
}

export function GlowButton({ children, variant = 'primary', onClick, href }: GlowButtonProps) {
  const baseClasses =
    'relative inline-flex items-center justify-center gap-2 px-8 py-4 rounded-full font-semibold text-base transition-all duration-300 cursor-pointer';

  const variantClasses =
    variant === 'primary'
      ? 'bg-gradient-to-r from-blue-500 to-cyan-500 text-white shadow-[0_0_30px_rgba(59,130,246,0.4)] hover:shadow-[0_0_50px_rgba(59,130,246,0.6)] hover:scale-105'
      : 'border border-white/20 text-slate-700 dark:text-slate-300 bg-white/5 hover:bg-white/10 hover:border-white/30';

  const Component = href ? 'a' : 'button';

  return (
    <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}>
      <Component
        className={`${baseClasses} ${variantClasses}`}
        onClick={onClick}
        {...(href ? { href, target: href.startsWith('http') ? '_blank' : undefined, rel: href.startsWith('http') ? 'noopener noreferrer' : undefined } : {})}
      >
        {children}
      </Component>
    </motion.div>
  );
}
