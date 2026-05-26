'use client';

import { motion } from 'framer-motion';
import { Brain, Coins, Link2 } from 'lucide-react';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { GlassCard } from '@/components/ui/GlassCard';

const narrativeCards = [
  {
    title: 'AI Verification',
    description: 'Documents, invoices, agreements, and shipment data are assisted by AI for faster verification and anomaly detection.',
    icon: Brain,
    accent: 'text-blue-500 bg-blue-500/10 border-blue-500/20',
    glow: 'rgba(59, 130, 246, 0.15)',
    tag: 'INTELLIGENT VERIFICATION',
  },
  {
    title: 'Tokenized Escrow State',
    description: 'Transaction value is represented as a non-tradable escrow state inside the platform workflow.',
    icon: Coins,
    accent: 'text-cyan-500 bg-cyan-500/10 border-cyan-500/20',
    glow: 'rgba(6, 182, 212, 0.15)',
    tag: 'PROGRAMMABLE TRUST',
  },
  {
    title: 'Blockchain Audit Trail',
    description: 'Each key event is recorded as proof, enabling transparent and immutable transaction monitoring.',
    icon: Link2,
    accent: 'text-violet-500 bg-violet-500/10 border-violet-500/20',
    glow: 'rgba(139, 92, 246, 0.15)',
    tag: 'IMMUTABLE EVIDENCE',
  },
];

const containerVariants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.15 },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6 },
  },
};

export default function ProductNarrative() {
  return (
    <div className="relative w-full overflow-visible mt-20">
      <div className="absolute inset-0 overflow-hidden pointer-events-none -z-10">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-blue-500/5 rounded-full blur-3xl pointer-events-none -z-10" />
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        <SectionHeading
          title="A neutral infrastructure layer for digital trade assurance."
          subtitle="NEXII PORT delivers the three crucial pillars required to establish cross-border trust."
          gradient
          align="center"
        />

        <motion.div
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8 mt-16"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
        >
          {narrativeCards.map((card, idx) => {
            const Icon = card.icon;
            return (
              <motion.div key={idx} variants={cardVariants}>
                <GlassCard hover className="h-full group flex flex-col justify-between">
                  <div>
                    {/* Tag badge */}
                    <span className="text-[9px] uppercase font-mono tracking-widest text-slate-400 dark:text-slate-500 block mb-4">
                      {card.tag}
                    </span>

                    {/* Icon */}
                    <div className="mb-6">
                      <div className={`inline-flex items-center justify-center w-12 h-12 rounded-xl border ${card.accent} shadow-lg transition-transform duration-300 group-hover:scale-115`}>
                        <Icon className="w-6 h-6" />
                      </div>
                    </div>

                    {/* Title */}
                    <h3 className="font-heading font-bold text-lg sm:text-xl text-slate-800 dark:text-white mb-4 group-hover:text-blue-500 dark:group-hover:text-blue-400 transition-colors">
                      {card.title}
                    </h3>

                    {/* Description */}
                    <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                      {card.description}
                    </p>
                  </div>

                  <div className="mt-8 pt-4 border-t border-slate-200/50 dark:border-white/5 flex items-center justify-between text-xs font-semibold text-slate-400 dark:text-slate-500 group-hover:text-blue-500 dark:group-hover:text-blue-400 transition-colors">
                    <span>Learn Infrastructure</span>
                    <svg
                      className="w-4 h-4 transform group-hover:translate-x-1 transition-transform"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth="2"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                    </svg>
                  </div>
                </GlassCard>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </div>
  );
}
