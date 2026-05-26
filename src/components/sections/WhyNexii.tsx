'use client';

import { motion } from 'framer-motion';
import { Zap, Eye, Minimize, Code, Cpu, ShieldAlert } from 'lucide-react';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { GlassCard } from '@/components/ui/GlassCard';

const benefits = [
  {
    title: 'Faster verification',
    description: 'AI-assisted processing cuts document compliance checking times from days to seconds, preventing shipment delays.',
    icon: Zap,
    color: 'text-blue-500 bg-blue-500/10 border-blue-500/20',
  },
  {
    title: 'Transparent escrow visibility',
    description: 'Neutral, real-time dashboards allow both buyer and seller to monitor deposit statuses and compliance validation phases.',
    icon: Eye,
    color: 'text-cyan-500 bg-cyan-500/10 border-cyan-500/20',
  },
  {
    title: 'Lower friction for SMEs',
    description: 'Provides accessible digital assurance, bypassing complex bank collateral blocks for smaller exporters.',
    icon: Minimize,
    color: 'text-violet-500 bg-violet-500/10 border-violet-500/20',
  },
  {
    title: 'Programmable settlement workflow',
    description: 'Leverages secure smart conditions to execute payments automatically when trade criteria are validated.',
    icon: Code,
    color: 'text-emerald-500 bg-emerald-500/10 border-emerald-500/20',
  },
  {
    title: 'Future CBDC-ready architecture',
    description: 'Designed from day one to connect with emerging Central Bank Digital Currency blueprints (Digital Rupiah).',
    icon: Cpu,
    color: 'text-amber-500 bg-amber-500/10 border-amber-500/20',
  },
  {
    title: 'Trust layer for cross-border trade',
    description: 'A sovereign-level, legally aligned framework built to secure international export transaction states.',
    icon: ShieldAlert,
    color: 'text-blue-600 bg-blue-600/10 border-blue-600/20',
  },
];

const containerVariants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.1 },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: 'easeOut' as const } },
};

export default function WhyNexii() {
  return (
    <div className="w-full relative overflow-visible mt-20">
      <div className="absolute inset-0 grid-pattern opacity-10 pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto relative z-10">
        <SectionHeading
          title="Why NEXII PORT"
          gradient
          align="center"
        />

        {/* Benefits Grid */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-16"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
        >
          {benefits.map((benefit, idx) => {
            const Icon = benefit.icon;
            return (
              <motion.div key={idx} variants={cardVariants}>
                <GlassCard hover className="h-full group">
                  <div className="flex items-start gap-4">
                    <div className={`p-3 rounded-lg border flex-shrink-0 transition-transform duration-300 group-hover:scale-110 ${benefit.color}`}>
                      <Icon className="w-5 h-5" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-slate-800 dark:text-slate-100 mb-1.5 group-hover:text-blue-500 dark:group-hover:text-blue-400 transition-colors">
                        {benefit.title}
                      </h3>
                      <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                        {benefit.description}
                      </p>
                    </div>
                  </div>
                </GlassCard>
              </motion.div>
            );
          })}
        </motion.div>

        {/* Legal/Governance Awareness copy block */}
        <motion.div
          className="mt-16 max-w-3xl mx-auto text-center border-t border-slate-200/50 dark:border-white/5 pt-10"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 leading-relaxed italic max-w-2xl mx-auto">
            “NEXII PORT does not replace existing institutions. It provides a programmable trust layer designed to make trade assurance more transparent, accessible, and efficient.”
          </p>
        </motion.div>
      </div>
    </div>
  );
}
