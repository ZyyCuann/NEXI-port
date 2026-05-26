'use client';

import { motion } from 'framer-motion';

interface SectionHeadingProps {
  title: string;
  subtitle?: string;
  gradient?: boolean;
  align?: 'left' | 'center';
}

export function SectionHeading({ title, subtitle, gradient = false, align = 'center' }: SectionHeadingProps) {
  return (
    <motion.div
      className={`mb-16 ${align === 'center' ? 'text-center' : 'text-left'}`}
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-100px' }}
      transition={{ duration: 0.6 }}
    >
      <h2
        className={`font-heading font-bold text-4xl md:text-5xl lg:text-6xl mb-6 ${
          gradient
            ? 'bg-gradient-to-r from-blue-500 via-cyan-400 to-blue-600 bg-clip-text text-transparent'
            : 'text-slate-900 dark:text-slate-50'
        }`}
      >
        {title}
      </h2>
      {subtitle && (
        <p className={`text-lg md:text-xl text-slate-600 dark:text-slate-400 max-w-3xl ${align === 'center' ? 'mx-auto' : ''}`}>
          {subtitle}
        </p>
      )}
    </motion.div>
  );
}
