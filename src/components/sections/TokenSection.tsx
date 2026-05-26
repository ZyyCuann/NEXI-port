'use client';

import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { Banknote, Coins, Lock, ArrowRight, ArrowDown, ShieldCheck } from 'lucide-react';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { GlassCard } from '@/components/ui/GlassCard';
import { tokenPoints } from '@/lib/data';

const flowSteps = [
  { label: 'Fiat Payment', icon: Banknote, color: 'from-green-500 to-emerald-600' },
  { label: 'Tokenized Escrow State', icon: Coins, color: 'from-blue-500 to-cyan-500' },
  { label: 'Non-Tradable Representation', icon: Lock, color: 'from-violet-500 to-purple-600' },
  { label: 'Future CBDC Settlement', icon: ShieldCheck, color: 'from-amber-500 to-orange-500' },
];

const containerVariants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.15 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: 'easeOut' as const } },
};

const arrowVariants = {
  hidden: { opacity: 0, scale: 0 },
  visible: { opacity: 1, scale: 1, transition: { duration: 0.3, ease: 'easeOut' as const } },
};

export default function TokenSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: '-100px' });

  return (
    <div ref={sectionRef} className="relative w-full overflow-visible mt-20">
      {/* Background accent */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none -z-10">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-blue-500/5 rounded-full blur-3xl pointer-events-none -z-10" />
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        <SectionHeading
          title="Tokenized, not speculative."
          gradient
          align="center"
        />

        {/* Subtitle */}
        <motion.p
          className="text-center text-sm md:text-base text-slate-600 dark:text-slate-400 max-w-3xl mx-auto -mt-10 mb-16 leading-relaxed"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          “The tokenized escrow state is not a public cryptocurrency, not a tradable asset, and not a speculative token. It is a digital representation of locked transaction value and settlement status within the NEXII PORT workflow.”
        </motion.p>

        {/* Visual flow diagram */}
        <motion.div
          className="flex flex-col md:flex-row items-center justify-center gap-4 md:gap-3 mb-20"
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
        >
          {flowSteps.map((step, idx) => (
            <div key={step.label} className="flex flex-col md:flex-row items-center gap-4 md:gap-3">
              {/* Flow box */}
              <motion.div
                variants={itemVariants}
                className="rounded-2xl border border-slate-200 dark:border-white/10 bg-white/70 dark:bg-white/5 backdrop-blur-xl p-6 flex flex-col items-center gap-3 w-56 min-h-[140px] justify-center"
              >
                <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${step.color} flex items-center justify-center shadow-lg`}>
                  <step.icon className="w-6 h-6 text-white" />
                </div>
                <span className="text-sm font-semibold text-slate-800 dark:text-slate-200 text-center leading-tight">
                  {step.label}
                </span>
              </motion.div>

              {/* Arrow between boxes */}
              {idx < flowSteps.length - 1 && (
                <motion.div variants={arrowVariants} className="flex-shrink-0">
                  <ArrowRight className="hidden md:block w-6 h-6 text-blue-500/60" />
                  <ArrowDown className="block md:hidden w-6 h-6 text-blue-500/60" />
                </motion.div>
              )}
            </div>
          ))}
        </motion.div>

        {/* Token points grid */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4"
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
        >
          {tokenPoints.map((point) => (
            <motion.div key={point.title} variants={itemVariants}>
              <GlassCard hover className="h-full">
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0 mt-0.5">
                    <ShieldCheck className="w-5 h-5 text-blue-500" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-slate-800 dark:text-slate-100 mb-1.5">
                      {point.title}
                    </h3>
                    <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                      {point.description}
                    </p>
                  </div>
                </div>
              </GlassCard>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </div>
  );
}
