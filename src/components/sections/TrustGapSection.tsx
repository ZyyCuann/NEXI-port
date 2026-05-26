'use client';

import { useRef, useState } from 'react';
import { motion, useInView } from 'framer-motion';
import { Landmark, Clock, Users, FileWarning, AlertTriangle, ChevronRight } from 'lucide-react';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { GlassCard } from '@/components/ui/GlassCard';

const problems = [
  {
    title: 'SME Barrier to Entry',
    description: 'SMEs struggle to access traditional bank-backed trade assurance due to heavy collateral requirements.',
    icon: Landmark,
    impact: 'Market exclusion',
  },
  {
    title: 'Complex Letter of Credit (LC)',
    description: 'LC and bank guarantee processes are slow, heavily manual, and expensive to set up.',
    icon: Clock,
    impact: '30+ day delay',
  },
  {
    title: 'Fragmented Visibility',
    description: 'Buyers and sellers lack neutral, transparent, and real-time transaction visibility.',
    icon: Users,
    impact: 'Systemic mistrust',
  },
  {
    title: 'Document Friction',
    description: 'Complex export-import documents create compliance risks and operational bottleneck.',
    icon: FileWarning,
    impact: 'Customs holds',
  },
  {
    title: 'Dispute Delays',
    description: 'When disagreements occur, disputes delay settlements for months without direct resolution pathways.',
    icon: AlertTriangle,
    impact: 'Frozen capital',
  },
];

export default function TrustGapSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: '-100px' });
  const [activeTab, setActiveTab] = useState<'legacy' | 'nexii'>('legacy');

  return (
    <div ref={sectionRef} className="relative w-full overflow-visible">
      <div className="absolute inset-0 grid-pattern opacity-10 dark:opacity-20 pointer-events-none -z-10" aria-hidden="true" />

      <div className="max-w-7xl mx-auto relative z-10">
        <SectionHeading
          title="Trade is global. Trust is still fragmented."
          subtitle="How traditional processes create capital lockups and slow SME export cycles."
          gradient
          align="center"
        />

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 mt-16 items-center">
          {/* Left panel: Interactive transaction rail visualizer */}
          <div className="lg:col-span-5 flex flex-col gap-6">
            <div className="glass-card p-6 border-slate-200/50 dark:border-white/5 bg-white/70 dark:bg-white/5 backdrop-blur-xl">
              <div className="flex justify-between items-center mb-6 border-b border-slate-200/50 dark:border-white/5 pb-4">
                <h3 className="text-sm font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400">Transaction Status</h3>
                <div className="flex gap-1.5 p-1 rounded-lg bg-slate-100 dark:bg-white/5 border border-slate-200/50 dark:border-white/5">
                  <button
                    onClick={() => setActiveTab('legacy')}
                    className={`text-[10px] uppercase font-mono tracking-widest px-3 py-1.5 rounded-md cursor-pointer transition-colors ${
                      activeTab === 'legacy' ? 'bg-red-500/10 text-red-500 border border-red-500/20 font-bold' : 'text-slate-500 hover:text-slate-800 dark:hover:text-slate-200'
                    }`}
                  >
                    Legacy Rail
                  </button>
                  <button
                    onClick={() => setActiveTab('nexii')}
                    className={`text-[10px] uppercase font-mono tracking-widest px-3 py-1.5 rounded-md cursor-pointer transition-colors ${
                      activeTab === 'nexii' ? 'bg-blue-500/10 text-blue-500 border border-blue-500/20 font-bold' : 'text-slate-500 hover:text-slate-800 dark:hover:text-slate-200'
                    }`}
                  >
                    NEXII Rail
                  </button>
                </div>
              </div>

              {/* Graphic container */}
              <div className="h-56 relative flex items-center justify-center bg-slate-100/50 dark:bg-slate-900/50 border border-slate-200/50 dark:border-white/5 rounded-xl overflow-hidden mb-4">
                {activeTab === 'legacy' ? (
                  /* Glitching legacy line */
                  <div className="w-full px-8 relative">
                    <svg viewBox="0 0 400 100" className="w-full h-full stroke-red-500 fill-none overflow-visible">
                      {/* Broken paths */}
                      <path d="M 0,50 L 50,50 L 70,20 L 90,80 L 110,30 L 125,50 L 150,50" strokeWidth="2.5" className="stroke-red-500" />
                      <path d="M 170,50 L 220,50 L 240,20 L 260,80 L 280,30 L 295,50 L 315,50" strokeWidth="2.5" className="stroke-red-500" strokeDasharray="5 5" />
                      <path d="M 335,50 L 400,50" strokeWidth="2.5" className="stroke-red-500" />
                      
                      {/* Disruption points */}
                      <circle cx="160" cy="50" r="8" className="fill-red-500/10 stroke-red-500 animate-ping" />
                      <circle cx="160" cy="50" r="4" className="fill-red-500" />
                      <circle cx="325" cy="50" r="8" className="fill-red-500/10 stroke-red-500 animate-ping" />
                      <circle cx="325" cy="50" r="4" className="fill-red-500" />
                    </svg>
                    <div className="absolute top-4 left-6 text-[10px] font-mono uppercase bg-red-500/10 text-red-500 border border-red-500/20 px-2 py-0.5 rounded animate-pulse">
                      Disrupted / Glitching
                    </div>
                    <div className="absolute bottom-4 left-6 right-6 flex justify-between text-[8px] font-mono text-red-500 uppercase tracking-widest">
                      <span>Buyer deposited</span>
                      <span>Friction Blockage</span>
                      <span>Delayed Settlement</span>
                    </div>
                  </div>
                ) : (
                  /* Smooth flowing nexii line */
                  <div className="w-full px-8 relative">
                    <svg viewBox="0 0 400 100" className="w-full h-full stroke-blue-500 fill-none overflow-visible">
                      {/* Perfectly smooth bezier wave */}
                      <motion.path
                        d="M 0,50 C 100,50 100,20 200,20 C 300,20 300,50 400,50"
                        strokeWidth="3"
                        className="stroke-blue-500 dark:stroke-blue-400"
                        initial={{ pathLength: 0 }}
                        animate={{ pathLength: 1 }}
                        transition={{ duration: 1.5, ease: 'easeInOut' }}
                      />
                      {/* Glowing particle tracing path */}
                      <circle cx="0" cy="50" r="4" className="fill-blue-500 dark:fill-blue-400 shadow-[0_0_8px_#3b82f6]">
                        <animateMotion dur="3s" repeatCount="indefinite" path="M 0,50 C 100,50 100,20 200,20 C 300,20 300,50 400,50" />
                      </circle>
                    </svg>
                    <div className="absolute top-4 left-6 text-[10px] font-mono uppercase bg-blue-500/10 text-blue-500 border border-blue-500/20 px-2 py-0.5 rounded">
                      NEXII Stream Assurance
                    </div>
                    <div className="absolute bottom-4 left-6 right-6 flex justify-between text-[8px] font-mono text-blue-500 uppercase tracking-widest">
                      <span>Agreement Set</span>
                      <span>AI Verified Flow</span>
                      <span>Instant Settlement</span>
                    </div>
                  </div>
                )}
              </div>

              <div className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed text-center italic">
                {activeTab === 'legacy'
                  ? 'Manual compliance checking and high-cost intermediaries generate unpredictability, risk, and constant status blind spots.'
                  : 'NEXII PORT automatically routes transaction verification, document auditing, and escrow status checks in a clear, unbroken line.'}
              </div>
            </div>
          </div>

          {/* Right panel: The structural list of friction items */}
          <div className="lg:col-span-7 flex flex-col gap-4">
            {problems.map((item, idx) => {
              const Icon = item.icon;
              return (
                <motion.div
                  key={idx}
                  className="group relative rounded-xl border border-slate-200 dark:border-white/5 bg-white/40 dark:bg-white/2 hover:border-red-500/20 dark:hover:border-red-500/20 p-5 transition-all duration-300 backdrop-blur-md"
                  whileHover={{ x: 10 }}
                >
                  <div className="flex items-start gap-4">
                    <div className="p-3 rounded-lg bg-red-500/5 dark:bg-red-500/10 text-red-500/80 group-hover:text-red-500 transition-colors">
                      <Icon className="w-5 h-5" />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center justify-between mb-1">
                        <h4 className="font-semibold text-slate-800 dark:text-slate-200 text-sm sm:text-base">
                          {item.title}
                        </h4>
                        <span className="text-[9px] uppercase font-mono tracking-widest text-red-500 bg-red-500/5 border border-red-500/10 px-2 py-0.5 rounded">
                          {item.impact}
                        </span>
                      </div>
                      <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 leading-relaxed">
                        {item.description}
                      </p>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
