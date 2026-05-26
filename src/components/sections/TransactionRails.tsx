'use client';

import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { ArrowRight, Brain, Coins, Link2, Landmark, Truck, CheckCircle } from 'lucide-react';
import { SectionHeading } from '@/components/ui/SectionHeading';

const railNodes = [
  { label: 'Buyer Node', icon: Landmark, color: 'text-blue-500 border-blue-500/20 bg-blue-500/5' },
  { label: 'Escrow State', icon: Coins, color: 'text-cyan-500 border-cyan-500/20 bg-cyan-500/5' },
  { label: 'AI Engine', icon: Brain, color: 'text-violet-500 border-violet-500/20 bg-violet-500/5' },
  { label: 'Ledger Audit', icon: Link2, color: 'text-emerald-500 border-emerald-500/20 bg-emerald-500/5' },
  { label: 'Settlement Node', icon: CheckCircle, color: 'text-blue-600 border-blue-600/20 bg-blue-600/5' },
];

export default function TransactionRails() {
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { once: true, margin: '-80px' });

  return (
    <div className="w-full relative overflow-visible bg-slate-900 text-white py-12 rounded-2xl border border-white/5 shadow-2xl mt-10">
      {/* Subtle grids inside dark segment */}
      <div className="absolute inset-0 grid-pattern opacity-10 pointer-events-none -z-10" />
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-blue-500/30 to-transparent pointer-events-none -z-10" />
      <div className="absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-cyan-500/30 to-transparent pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <SectionHeading
          title="Live Transaction Rail Section"
          subtitle="A close-up view of Nusantara’s digital transaction piping system."
          gradient
          align="center"
        />

        <div ref={containerRef} className="mt-16 bg-slate-950/80 border border-white/5 rounded-2xl p-8 relative shadow-2xl backdrop-blur-md overflow-x-auto min-w-[800px] lg:min-w-0">
          {/* Legend */}
          <div className="flex justify-between items-center mb-10 text-[10px] font-mono tracking-widest text-slate-500 uppercase">
            <span>Transaction Pipe Layer v1.08</span>
            <span className="flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-blue-500 animate-pulse shadow-[0_0_8px_#3b82f6]" />
              ACTIVE CONDUIT FLOWS
            </span>
          </div>

          {/* SVG Pipe Infrastructure Grid */}
          <div className="relative h-44 flex items-center justify-between px-10">
            {/* The SVG pipes background */}
            <svg className="absolute inset-0 w-full h-full stroke-slate-800 fill-none overflow-visible pointer-events-none" style={{ zIndex: 0 }}>
              {/* Outer grid boundary line */}
              <line x1="5%" y1="50%" x2="95%" y2="50%" stroke="rgba(255,255,255,0.03)" strokeWidth="12" />
              
              {/* Core piping network pathways */}
              <path d="M 50,88 L 850,88" stroke="rgba(255,255,255,0.05)" strokeWidth="4" />
              <path d="M 50,88 C 200,88 200,30 350,30 L 650,30 C 800,30 800,88 850,88" stroke="rgba(59,130,246,0.15)" strokeWidth="2.5" />
              <path d="M 50,88 C 200,88 200,146 350,146 L 650,146 C 800,146 800,88 850,88" stroke="rgba(6,182,212,0.15)" strokeWidth="2.5" />

              {/* Glowing particles flowing left to right */}
              {isInView && (
                <>
                  {/* Particle 1 - Core pipe */}
                  <circle cx="0" cy="0" r="3.5" className="fill-blue-500 shadow-[0_0_8px_#3b82f6]">
                    <animateMotion dur="4s" repeatCount="indefinite" path="M 50,88 L 850,88" />
                  </circle>
                  
                  {/* Particle 2 - Top pipe */}
                  <circle cx="0" cy="0" r="3" className="fill-cyan-400 shadow-[0_0_8px_#06b6d4]">
                    <animateMotion dur="5.5s" repeatCount="indefinite" path="M 50,88 C 200,88 200,30 350,30 L 650,30 C 800,30 800,88 850,88" />
                  </circle>
                  
                  {/* Particle 3 - Bottom pipe */}
                  <circle cx="0" cy="0" r="3" className="fill-violet-400 shadow-[0_0_8px_#8b5cf6]">
                    <animateMotion dur="4.8s" repeatCount="indefinite" path="M 50,88 C 200,88 200,146 350,146 L 650,146 C 800,146 800,88 850,88" />
                  </circle>
                </>
              )}
            </svg>

            {/* Overlaid system nodes */}
            {railNodes.map((node, idx) => {
              const Icon = node.icon;
              return (
                <div key={idx} className="relative z-10 flex flex-col items-center gap-3">
                  <motion.div
                    className={`w-14 h-14 rounded-xl border flex items-center justify-center backdrop-blur-xl transition-all duration-300 shadow-lg ${node.color}`}
                    whileHover={{ scale: 1.15, rotate: 5 }}
                    initial={{ opacity: 0, y: 20 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ delay: idx * 0.15, duration: 0.5 }}
                  >
                    <Icon className="w-6 h-6" />
                  </motion.div>
                  <span className="text-[10px] uppercase font-mono tracking-widest text-slate-400">
                    {node.label}
                  </span>
                </div>
              );
            })}
          </div>

          <div className="mt-8 pt-6 border-t border-white/5 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-mono text-slate-500">
            <span>Exporter Node verified via Bea Cukai digital signature API alignment</span>
            <div className="flex items-center gap-1.5 text-blue-400 font-bold uppercase tracking-widest">
              <span>Auto routing status: Ready</span>
              <ArrowRight className="w-3.5 h-3.5 animate-pulse" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
