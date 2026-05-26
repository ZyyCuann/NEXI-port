'use client';

import { motion } from 'framer-motion';

const marqueeItems = [
  'AI Verification',
  'Tokenized Escrow State',
  'Blockchain Audit Trail',
  'Programmable Settlement',
  'Future CBDC Ready',
  'Trade Assurance',
  'Cross-Border Trust',
  'Export Infrastructure',
  'Digital Trade Rails',
  'Non-Tradable Settlement Representation',
];

export default function MarqueeSection() {
  // Double the items array to ensure infinite wrapping covers the width
  const items = [...marqueeItems, ...marqueeItems, ...marqueeItems];

  return (
    <div className="w-full py-6 border-y border-slate-200/50 dark:border-white/5 bg-[#f8fafc]/50 dark:bg-[#030712]/50 backdrop-blur-sm overflow-hidden relative z-20">
      <div className="absolute left-0 top-0 bottom-0 w-24 bg-gradient-to-r from-white dark:from-[#030712] to-transparent z-10 pointer-events-none" />
      <div className="absolute right-0 top-0 bottom-0 w-24 bg-gradient-to-l from-white dark:from-[#030712] to-transparent z-10 pointer-events-none" />

      <motion.div
        className="flex gap-16 whitespace-nowrap"
        animate={{ x: [0, -1000] }}
        transition={{
          repeat: Infinity,
          ease: 'linear',
          duration: 30,
        }}
      >
        {items.map((item, idx) => (
          <div key={idx} className="flex items-center gap-4 text-xs font-semibold uppercase tracking-widest font-mono text-slate-500 dark:text-slate-400">
            <span>{item}</span>
            <span className="w-1.5 h-1.5 rounded-full bg-blue-500 shadow-[0_0_8px_#3b82f6]" />
          </div>
        ))}
      </motion.div>
    </div>
  );
}
