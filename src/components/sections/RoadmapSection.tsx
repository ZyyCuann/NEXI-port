'use client';

import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { GlassCard } from '@/components/ui/GlassCard';
import { roadmapPhases } from '@/lib/data';

const containerVariants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.12 },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: 'easeOut' as const } },
};

export default function RoadmapSection() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <div className="relative w-full overflow-visible">
      <div className="absolute inset-0 overflow-hidden pointer-events-none -z-10">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[850px] bg-cyan-500/5 rounded-full blur-3xl pointer-events-none -z-10" />
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        <SectionHeading
          title="Infrastructure Roadmap"
          subtitle="Our systematic pathway from foundational trade verification to future CBDC programmable settlement."
          gradient
          align="center"
        />

        {/* Roadmap Grid Layout */}
        <motion.div
          ref={ref}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6 mt-16"
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
        >
          {roadmapPhases.map((phase, idx) => (
            <motion.div key={phase.phase} variants={cardVariants} className="relative">
              {/* Timeline Header connection for large screens */}
              <div className="hidden lg:block absolute -top-8 left-[50%] right-[-50%] h-[2px] bg-gradient-to-r from-blue-500 to-cyan-500 z-0 opacity-20" style={{ display: idx === 4 ? 'none' : 'block' }} />
              
              {/* Node Indicator circle */}
              <div className="hidden lg:flex justify-center mb-6 relative z-10">
                <div className={`w-4 h-4 rounded-full border-2 transition-all duration-300 ${
                  idx === 0
                    ? 'bg-blue-500 border-blue-400 shadow-[0_0_12px_#3b82f6]'
                    : 'bg-slate-200 dark:bg-slate-900 border-slate-300 dark:border-white/10'
                }`} />
              </div>

              <GlassCard hover className={`h-full group ${idx === 0 ? 'border-blue-500/30' : ''}`}>
                <div className="flex flex-col h-full justify-between">
                  <div>
                    {/* Phase Badge */}
                    <div className="flex justify-between items-center mb-4">
                      <span className={`text-[9px] uppercase font-mono tracking-widest font-bold px-2 py-0.5 rounded ${
                        idx === 0 ? 'bg-blue-500/10 text-blue-500 border border-blue-500/20' : 'bg-slate-100 dark:bg-white/5 text-slate-500'
                      }`}>
                        PHASE 0{phase.phase}
                      </span>
                      {idx === 0 && (
                        <span className="w-1.5 h-1.5 rounded-full bg-blue-500 animate-pulse" />
                      )}
                    </div>

                    {/* Titles */}
                    <h3 className="font-heading font-bold text-sm sm:text-base text-slate-800 dark:text-white mb-1 group-hover:text-blue-500 dark:group-hover:text-blue-400 transition-colors">
                      {phase.title}
                    </h3>
                    <p className="text-[11px] font-mono text-slate-400 dark:text-slate-500 font-bold uppercase tracking-wider mb-4">
                      {phase.subtitle}
                    </p>

                    {/* Bullet items */}
                    <ul className="space-y-2.5">
                      {phase.items.map((item: string, bulletIdx: number) => (
                        <li key={bulletIdx} className="flex items-start gap-2 text-[11px] sm:text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                          <span className="w-1.5 h-1.5 rounded-full bg-blue-500/50 mt-1.5 flex-shrink-0" />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
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
