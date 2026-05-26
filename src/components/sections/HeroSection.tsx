'use client';

import { useRef, useState, useEffect } from 'react';
import { motion, useInView } from 'framer-motion';
import { Brain, Coins, Link2, Banknote, ArrowRight, Eye, ShieldCheck, Lock, Cpu, Globe } from 'lucide-react';
import ParticleNetwork from '@/components/effects/ParticleNetwork';
import GlowOrb from '@/components/effects/GlowOrb';
import { GlowButton } from '@/components/ui/GlowButton';

/* Animation variants */
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.8 },
  },
};

export default function HeroSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, { once: true, amount: 0.1 });
  const [activeStep, setActiveStep] = useState(0);

  // Auto-pulse steps in floating cards for dynamic feel
  useEffect(() => {
    const timer = setInterval(() => {
      setActiveStep((prev) => (prev + 1) % 4);
    }, 3000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div
      ref={sectionRef}
      className="relative w-full overflow-visible flex items-center justify-center"
    >
      {/* Subtle animated grid background */}
      <div className="absolute inset-0 grid-pattern opacity-[0.15] dark:opacity-30 pointer-events-none -z-10" aria-hidden="true" />
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#f8fafc]/50 to-[#f8fafc] dark:via-[#030712]/50 dark:to-[#030712] pointer-events-none -z-10" />

      {/* Background canvas effects */}
      <ParticleNetwork className="-z-10 opacity-40 dark:opacity-80 pointer-events-none" />
      <GlowOrb color="blue" size="lg" className="-top-40 -left-40 opacity-40 dark:opacity-60 -z-10 pointer-events-none" />
      <GlowOrb color="cyan" size="lg" className="-bottom-40 -right-40 opacity-40 dark:opacity-60 -z-10 pointer-events-none" />

      <div className="max-w-7xl mx-auto w-full relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
        {/* Left text column */}
        <motion.div
          className="lg:col-span-6 text-left"
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
        >
          {/* Pre-title badge */}
          <motion.div variants={itemVariants} className="inline-flex mb-6">
            <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-semibold border border-blue-500/20 dark:border-blue-400/20 bg-blue-500/5 dark:bg-blue-500/10 text-blue-600 dark:text-blue-400 backdrop-blur-sm shadow-[0_0_15px_rgba(59,130,246,0.1)]">
              <span className="w-1.5 h-1.5 rounded-full bg-blue-500 animate-pulse" />
              Nusantara Export and Import Infrastructure
            </span>
          </motion.div>

          {/* Headline */}
          <motion.h1
            variants={itemVariants}
            className="font-heading text-5xl md:text-7xl xl:text-8xl font-extrabold leading-tight tracking-tight text-slate-900 dark:text-white mb-6"
          >
            Reinventing
            <br />
            <span className="gradient-text">Trade Trust.</span>
          </motion.h1>

          {/* Subheadline */}
          <motion.p
            variants={itemVariants}
            className="text-base md:text-lg leading-relaxed text-slate-600 dark:text-slate-400 mb-10 max-w-2xl"
          >
            NEXII PORT is a programmable trade assurance infrastructure built to make export-import transactions more transparent, automated, and future-ready.
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            variants={itemVariants}
            className="flex flex-wrap items-center gap-4"
          >
            <GlowButton
              variant="primary"
              onClick={() => {
                const el = document.getElementById('flow');
                if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
              }}
            >
              <Eye className="w-4 h-4 mr-2" />
              Explore Flow
            </GlowButton>
            <GlowButton
              variant="secondary"
              onClick={() => {
                const el = document.getElementById('demo');
                if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
              }}
            >
              <ArrowRight className="w-4 h-4 mr-2" />
              View Demo
            </GlowButton>
          </motion.div>
        </motion.div>

        {/* Right visualization column */}
        <div className="lg:col-span-6 relative h-[500px] sm:h-[600px] w-full flex items-center justify-center">
          {/* Abstract Global Transaction Network */}
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
            <div className="w-[300px] sm:w-[450px] h-[300px] sm:h-[450px] rounded-full border border-blue-500/10 dark:border-blue-500/20 absolute animate-spin-slow" />
            <div className="w-[200px] sm:w-[300px] h-[200px] sm:h-[300px] rounded-full border border-cyan-500/5 dark:border-cyan-500/10 absolute animate-spin-slow [animation-direction:reverse]" />
            <div className="w-[100px] sm:w-[150px] h-[100px] sm:h-[150px] rounded-full border border-slate-500/5 dark:border-slate-500/10 absolute" />

            {/* Glowing routes/dots */}
            <div className="absolute w-2 h-2 rounded-full bg-blue-500 shadow-[0_0_10px_#3b82f6] animate-ping" style={{ transform: 'translate(100px, -80px)' }} />
            <div className="absolute w-2.5 h-2.5 rounded-full bg-cyan-500 shadow-[0_0_10px_#06b6d4] animate-ping" style={{ transform: 'translate(-120px, 90px)' }} />
            <div className="absolute w-1.5 h-1.5 rounded-full bg-violet-500 shadow-[0_0_8px_#8b5cf6]" style={{ transform: 'translate(40px, 140px)' }} />
          </div>

          {/* Floating UI cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 w-full max-w-[500px] p-4 relative z-10">
            {/* Card 1: AI Verification */}
            <motion.div
              className={`glass-card p-5 cursor-default transition-all duration-500 ${
                activeStep === 0
                  ? 'border-blue-500/40 bg-blue-500/5 dark:bg-blue-500/10 shadow-[0_0_20px_rgba(59,130,246,0.15)] scale-[1.03]'
                  : 'opacity-70 hover:opacity-100'
              }`}
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              whileHover={{ y: -5 }}
            >
              <div className="flex items-center gap-3 mb-3">
                <div className="p-2 rounded-lg bg-blue-500/10 text-blue-500">
                  <Brain className="w-5 h-5" />
                </div>
                <div>
                  <span className="text-xs font-mono text-slate-400 dark:text-slate-500 block">ENGINE v1.02</span>
                  <h3 className="text-xs font-bold text-slate-800 dark:text-slate-200">AI Verification</h3>
                </div>
              </div>
              <div className="space-y-1.5">
                <div className="flex justify-between items-center text-[10px]">
                  <span className="text-slate-500">Document Scan</span>
                  <span className="text-blue-500 font-semibold flex items-center gap-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-blue-500 animate-pulse" />
                    Passed
                  </span>
                </div>
                <div className="w-full bg-slate-200 dark:bg-white/10 h-1.5 rounded-full overflow-hidden">
                  <div className="bg-blue-500 h-full w-[100%] transition-all duration-1000" />
                </div>
                <p className="text-[10px] text-slate-500 leading-tight">HS Code & invoice mismatch validation verified.</p>
              </div>
            </motion.div>

            {/* Card 2: Tokenized Escrow State */}
            <motion.div
              className={`glass-card p-5 cursor-default transition-all duration-500 ${
                activeStep === 1
                  ? 'border-cyan-500/40 bg-cyan-500/5 dark:bg-cyan-500/10 shadow-[0_0_20px_rgba(6,182,212,0.15)] scale-[1.03]'
                  : 'opacity-70 hover:opacity-100'
              }`}
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              whileHover={{ y: -5 }}
            >
              <div className="flex items-center gap-3 mb-3">
                <div className="p-2 rounded-lg bg-cyan-500/10 text-cyan-500">
                  <Coins className="w-5 h-5" />
                </div>
                <div>
                  <span className="text-xs font-mono text-slate-400 dark:text-slate-500 block">ESCROW ORCH</span>
                  <h3 className="text-xs font-bold text-slate-800 dark:text-slate-200">Tokenized Escrow</h3>
                </div>
              </div>
              <div className="space-y-1">
                <div className="flex justify-between items-center text-[10px]">
                  <span className="text-slate-500">State representation</span>
                  <span className="text-cyan-500 font-bold border border-cyan-500/30 px-1.5 rounded text-[8px] uppercase">
                    Locked
                  </span>
                </div>
                <div className="text-sm font-semibold text-slate-800 dark:text-white mt-1">$48,250 USD</div>
                <p className="text-[9px] text-slate-500 leading-tight">Non-tradable workflow status asset token.</p>
              </div>
            </motion.div>

            {/* Card 3: Blockchain Audit Trail */}
            <motion.div
              className={`glass-card p-5 cursor-default transition-all duration-500 ${
                activeStep === 2
                  ? 'border-violet-500/40 bg-violet-500/5 dark:bg-violet-500/10 shadow-[0_0_20px_rgba(139,92,246,0.15)] scale-[1.03]'
                  : 'opacity-70 hover:opacity-100'
              }`}
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              whileHover={{ y: -5 }}
            >
              <div className="flex items-center gap-3 mb-3">
                <div className="p-2 rounded-lg bg-violet-500/10 text-violet-500">
                  <Link2 className="w-5 h-5" />
                </div>
                <div>
                  <span className="text-xs font-mono text-slate-400 dark:text-slate-500 block">PROOF ENGINE</span>
                  <h3 className="text-xs font-bold text-slate-800 dark:text-slate-200">Audit Trail</h3>
                </div>
              </div>
              <div className="space-y-1 font-mono text-[9px] text-slate-600 dark:text-slate-400">
                <div className="flex justify-between">
                  <span>Block Height:</span>
                  <span className="text-slate-800 dark:text-white font-semibold">#724912</span>
                </div>
                <div className="flex justify-between">
                  <span>Hash:</span>
                  <span className="text-violet-500 font-semibold">0x3b82...c2b5</span>
                </div>
                <p className="text-[9px] text-slate-500 leading-tight mt-1 font-sans">Immutable cryptographic transaction timeline logs.</p>
              </div>
            </motion.div>

            {/* Card 4: Future CBDC Ready */}
            <motion.div
              className={`glass-card p-5 cursor-default transition-all duration-500 ${
                activeStep === 3
                  ? 'border-emerald-500/40 bg-emerald-500/5 dark:bg-emerald-500/10 shadow-[0_0_20px_rgba(16,185,129,0.15)] scale-[1.03]'
                  : 'opacity-70 hover:opacity-100'
              }`}
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
              whileHover={{ y: -5 }}
            >
              <div className="flex items-center gap-3 mb-3">
                <div className="p-2 rounded-lg bg-emerald-500/10 text-emerald-500">
                  <Banknote className="w-5 h-5" />
                </div>
                <div>
                  <span className="text-xs font-mono text-slate-400 dark:text-slate-500 block">SETTLEMENT</span>
                  <h3 className="text-xs font-bold text-slate-800 dark:text-slate-200">Future CBDC Ready</h3>
                </div>
              </div>
              <div className="space-y-1">
                <div className="flex justify-between items-center text-[10px]">
                  <span className="text-slate-500">Rupiah Settlement</span>
                  <span className="text-emerald-500 font-semibold flex items-center gap-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                    Aligned
                  </span>
                </div>
                <div className="text-[9px] font-medium text-slate-500 leading-tight">
                  Compatible with Bank Indonesia Digital Rupiah architecture blueprint.
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
}
