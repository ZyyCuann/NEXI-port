'use client';

import { useRef, useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Play, RotateCcw, ShieldCheck, Lock, Landmark, Brain, Link2, Truck, FileCheck, CheckCircle2 } from 'lucide-react';
import { SectionHeading } from '@/components/ui/SectionHeading';

const steps = [
  { id: 1, label: 'Terms Agreed', icon: FileCheck, title: 'Trade Terms Agreed' },
  { id: 2, label: 'Payment Initiated', icon: Landmark, title: 'Fiat Payment Initiated' },
  { id: 3, label: 'Escrow Created', icon: Lock, title: 'Tokenized Escrow State Created' },
  { id: 4, label: 'AI Verifying', icon: Brain, title: 'AI Verifies Documents' },
  { id: 5, label: 'Proof Recorded', icon: Link2, title: 'Blockchain Records Proof' },
  { id: 6, label: 'Confirmed', icon: Truck, title: 'Conditions Confirmed' },
  { id: 7, label: 'Settlement Released', icon: CheckCircle2, title: 'Settlement Released' },
];

export default function InteractiveFlow() {
  const [currentStep, setCurrentStep] = useState(1);
  const [isSimulating, setIsSimulating] = useState(false);

  // States to map to steps in simulation
  const getDashboardData = () => {
    switch (currentStep) {
      case 1:
        return {
          escrow: 'Pending',
          ai: 'Standby',
          hash: 'Not Recorded',
          shipment: 'Pending',
          dispute: 'Clear',
          settlement: 'Locked',
          log: 'Waiting for buyer fiat deposit...',
        };
      case 2:
        return {
          escrow: 'Funding',
          ai: 'Standby',
          hash: 'Not Recorded',
          shipment: 'Pending',
          dispute: 'Clear',
          settlement: 'Locked',
          log: 'Fiat payment detected. Setting up escrow orchestration...',
        };
      case 3:
        return {
          escrow: 'Locked',
          ai: 'Standby',
          hash: '0x9F3A...82C',
          shipment: 'Pending',
          dispute: 'Clear',
          settlement: 'Locked',
          log: 'Tokenized escrow state locked ($48,250 USD). Generating audit trails...',
        };
      case 4:
        return {
          escrow: 'Locked',
          ai: 'Processing',
          hash: '0x9F3A...82C',
          shipment: 'Pending',
          dispute: 'Clear',
          settlement: 'Locked',
          log: 'AI Engine scanning bills of lading, customs paperwork, and invoices for anomalies...',
        };
      case 5:
        return {
          escrow: 'Locked',
          ai: 'Passed',
          hash: '0x9F3A...82C',
          shipment: 'Pending',
          dispute: 'Clear',
          settlement: 'Locked',
          log: 'AI verification PASSED. Cryptographic hash recorded on blockchain audit log.',
        };
      case 6:
        return {
          escrow: 'Locked',
          ai: 'Passed',
          hash: '0x9F3A...82C',
          shipment: 'Confirmed',
          dispute: 'Clear',
          settlement: 'Ready to Release',
          log: 'Customs release confirmed via Bea Cukai API. All conditions successfully MET.',
        };
      case 7:
      default:
        return {
          escrow: 'Released',
          ai: 'Passed',
          hash: '0x9F3A...82C',
          shipment: 'Confirmed',
          dispute: 'Clear',
          settlement: 'Completed',
          log: 'Settlement disbursed directly to SME Exporter bank account. Escrow finalized.',
        };
    }
  };

  const dashboard = getDashboardData();

  const handleSimulate = () => {
    if (isSimulating) return;
    setIsSimulating(true);
    setCurrentStep(1);

    let step = 1;
    const interval = setInterval(() => {
      step += 1;
      setCurrentStep(step);
      if (step >= 7) {
        clearInterval(interval);
        setIsSimulating(false);
      }
    }, 2500);
  };

  return (
    <div className="w-full relative overflow-visible">
      {/* Subtle animated background */}
      <div className="absolute inset-0 bg-[#f8fafc] dark:bg-[#030712] pointer-events-none -z-10" />

      <div className="mx-auto max-w-7xl relative z-10">
        <SectionHeading
          title="Interactive Platform Flow"
          subtitle="Watch how NEXII PORT orchestrates document audits, value locking, and settlement in real-time."
          gradient
          align="center"
        />

        <div className="grid grid-cols-1 xl:grid-cols-[1.25fr_0.75fr] gap-10 mt-16 items-start">
          {/* Left panel: Horizontal stepper on desktop, scrollable row on mobile */}
          <div className="flex flex-col gap-8">
            <div className="glass-card p-6 border-slate-200/50 dark:border-white/5 bg-white/50 dark:bg-white/2 backdrop-blur-md overflow-hidden">
              <h3 className="text-sm font-semibold uppercase tracking-wider text-slate-400 dark:text-slate-500 mb-6 font-bold">
                Execution Steps
              </h3>

              {/* Horizontal Scroll wrapper for tablet/mobile */}
              <div className="overflow-x-auto pb-4 md:pb-0 scrollbar-thin">
                <div className="flex flex-row justify-between relative gap-6 md:gap-2 min-w-[700px] md:min-w-0">
                {/* Connecting horizontal line for desktop */}
                <div className="absolute top-6 left-6 right-6 h-0.5 bg-slate-200 dark:bg-white/5 hidden md:block z-0" />
                {/* Active progress track for desktop */}
                <motion.div
                  className="absolute top-6 left-6 h-0.5 bg-blue-500 z-0 hidden md:block"
                  style={{
                    width: `${((currentStep - 1) / (steps.length - 1)) * 90}%`,
                  }}
                  transition={{ duration: 0.5 }}
                />

                {steps.map((step) => {
                  const Icon = step.icon;
                  const isActive = currentStep >= step.id;
                  const isCurrent = currentStep === step.id;

                  return (
                    <div
                      key={step.id}
                      onClick={() => !isSimulating && setCurrentStep(step.id)}
                      className={`relative z-10 flex flex-row md:flex-col items-center gap-4 md:gap-3 cursor-pointer group ${
                        isSimulating ? 'pointer-events-none' : ''
                      }`}
                    >
                      {/* Step node */}
                      <div
                        className={`w-12 h-12 rounded-full flex items-center justify-center border-2 backdrop-blur-xl transition-all duration-300 ${
                          isCurrent
                            ? 'border-blue-500 bg-blue-500 text-white shadow-[0_0_20px_rgba(59,130,246,0.4)] scale-110'
                            : isActive
                              ? 'border-blue-500/80 bg-blue-500/10 text-blue-500'
                              : 'border-slate-200 dark:border-white/10 bg-white dark:bg-slate-900 text-slate-400 hover:border-slate-300 dark:hover:border-white/20'
                        }`}
                      >
                        <Icon className="w-5 h-5" />
                      </div>

                      {/* Step Labels */}
                      <div className="text-left md:text-center">
                        <span
                          className={`block text-[10px] font-mono font-bold tracking-wider transition-colors ${
                            isActive ? 'text-blue-500' : 'text-slate-400'
                          }`}
                        >
                          STEP 0{step.id}
                        </span>
                        <span
                          className={`block text-xs font-semibold whitespace-nowrap transition-colors ${
                            isCurrent
                              ? 'text-slate-900 dark:text-white font-bold'
                              : isActive
                                ? 'text-slate-700 dark:text-slate-300'
                                : 'text-slate-400 dark:text-slate-500'
                          }`}
                        >
                          {step.label}
                        </span>
                      </div>
                    </div>
                  );
                })}
                </div>
              </div>
            </div>

            {/* Simulated detailed step display */}
            <div className="glass-card p-8 border-slate-200/50 dark:border-white/5 bg-white/70 dark:bg-white/5 backdrop-blur-xl flex flex-col gap-4">
              <span className="text-[10px] font-mono font-bold text-blue-500 uppercase tracking-widest">
                Active Step Analysis
              </span>
              <h3 className="font-heading font-bold text-xl sm:text-2xl text-slate-800 dark:text-white">
                {steps[currentStep - 1].title}
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                {currentStep === 1 && 'SME Exporter and Global Buyer align their commercial invoices, specifications, packing criteria, and cargo conditions directly in the NEXII platform workflow.'}
                {currentStep === 2 && 'Buyer deposits settlement fiat funds ($48,250 USD) into the local fiat onboarding node. NEXII orchestration automatically acknowledges the funding.'}
                {currentStep === 3 && 'The locked fiat funds are represented as a secure, non-tradable tokenized escrow state. This secures compliance verification parameters and guarantees payment.'}
                {currentStep === 4 && 'The AI compliance engine scans HS Codes, packing lists, invoices, and customs paperwork against legal records and anomaly databases to detect risk parameters.'}
                {currentStep === 5 && 'The platform logs cryptographically signed document verification checkpoints and hashes directly onto the blockchain, generating a transparent audit ledger.'}
                {currentStep === 6 && 'Cargo customs release and logistics parameters are verified directly. Smart release conditions are met, moving settlement status to unlocked.'}
                {currentStep === 7 && 'The tokenized state completes. Programmable settlement instantly disperses physical bank transfers directly to the SME exporter’s domestic bank account.'}
              </p>
            </div>
          </div>

          {/* Right panel: Live dashboard panel mockup */}
          <div className="flex flex-col gap-6 w-full min-h-[420px]">
            <div className="glass-card p-6 border-slate-200/50 dark:border-white/5 bg-slate-950 text-slate-200 font-mono text-xs shadow-2xl relative overflow-hidden w-full h-full min-h-[400px]">
              {/* Subtle top glow bar */}
              <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-blue-500 to-cyan-500" />

              <div className="flex justify-between items-center mb-6 border-b border-white/5 pb-4">
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse shadow-[0_0_8px_#10b981]" />
                  <span className="text-[10px] font-bold tracking-widest text-slate-400 uppercase">
                    Assurance Monitor
                  </span>
                </div>
                <span className="text-[9px] bg-white/10 px-2 py-0.5 rounded text-white font-mono">
                  LIVE FEED
                </span>
              </div>

              {/* Key variables mapping */}
              <div className="space-y-4">
                <div className="flex justify-between items-center py-1.5 border-b border-white/5">
                  <span className="text-slate-400 font-sans">Escrow Status:</span>
                  <span
                    className={`font-semibold px-2 py-0.5 rounded uppercase text-[10px] ${
                      dashboard.escrow === 'Released'
                        ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20'
                        : dashboard.escrow === 'Locked'
                          ? 'bg-blue-500/10 text-blue-400 border border-blue-500/20'
                          : 'bg-yellow-500/10 text-yellow-400 border border-yellow-500/20'
                    }`}
                  >
                    {dashboard.escrow}
                  </span>
                </div>

                <div className="flex justify-between items-center py-1.5 border-b border-white/5">
                  <span className="text-slate-400 font-sans">AI Verification:</span>
                  <span
                    className={`font-semibold px-2 py-0.5 rounded uppercase text-[10px] ${
                      dashboard.ai === 'Passed'
                        ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20'
                        : dashboard.ai === 'Processing'
                          ? 'bg-blue-500/10 text-blue-400 border border-blue-500/20'
                          : 'bg-slate-800 text-slate-400'
                    }`}
                  >
                    {dashboard.ai}
                  </span>
                </div>

                <div className="flex justify-between items-center py-1.5 border-b border-white/5">
                  <span className="text-slate-400 font-sans">Document Hash:</span>
                  <span className="text-slate-300 text-[10px] font-mono">{dashboard.hash}</span>
                </div>

                <div className="flex justify-between items-center py-1.5 border-b border-white/5">
                  <span className="text-slate-400 font-sans">Shipment:</span>
                  <span
                    className={`font-semibold px-2 py-0.5 rounded uppercase text-[10px] ${
                      dashboard.shipment === 'Confirmed'
                        ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20'
                        : 'bg-slate-800 text-slate-400'
                    }`}
                  >
                    {dashboard.shipment}
                  </span>
                </div>

                <div className="flex justify-between items-center py-1.5 border-b border-white/5">
                  <span className="text-slate-400 font-sans">Dispute Status:</span>
                  <span className="text-emerald-400 font-bold">CLEAR</span>
                </div>

                <div className="flex justify-between items-center py-1.5">
                  <span className="text-slate-400 font-sans">Settlement:</span>
                  <span
                    className={`font-semibold px-2 py-0.5 rounded uppercase text-[10px] ${
                      dashboard.settlement === 'Completed'
                        ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 font-bold'
                        : dashboard.settlement === 'Ready to Release'
                          ? 'bg-blue-500/10 text-blue-400 border border-blue-500/20 font-bold animate-pulse'
                          : 'bg-slate-800 text-slate-400'
                    }`}
                  >
                    {dashboard.settlement}
                  </span>
                </div>
              </div>

              {/* Console log display */}
              <div className="mt-6 pt-4 border-t border-white/5 bg-black/40 p-3 rounded-lg border border-white/5">
                <span className="text-[9px] text-blue-400 uppercase font-bold tracking-wider block mb-1">
                  Orchestrator Terminal
                </span>
                <p className="text-[10px] text-slate-300 leading-normal h-12 overflow-hidden italic">
                  {dashboard.log}
                </p>
              </div>

              {/* Action buttons */}
              <div className="mt-6 flex gap-2">
                <button
                  onClick={handleSimulate}
                  disabled={isSimulating}
                  className={`flex-1 flex items-center justify-center gap-2 py-2.5 px-4 rounded-lg font-sans font-bold text-xs cursor-pointer transition-colors ${
                    isSimulating
                      ? 'bg-slate-800 text-slate-500 cursor-not-allowed border border-slate-700/50'
                      : 'bg-blue-500 text-white hover:bg-blue-600 shadow-[0_0_15px_rgba(59,130,246,0.3)]'
                  }`}
                >
                  {isSimulating ? (
                    <>
                      <span className="w-3 h-3 rounded-full border-2 border-slate-500 border-t-white animate-spin" />
                      Simulating...
                    </>
                  ) : (
                    <>
                      <Play className="w-3.5 h-3.5 fill-white" />
                      Simulate Transaction
                    </>
                  )}
                </button>

                {!isSimulating && currentStep > 1 && (
                  <button
                    onClick={() => setCurrentStep(1)}
                    className="p-2.5 rounded-lg bg-slate-800 text-slate-400 hover:text-white border border-slate-700 cursor-pointer"
                  >
                    <RotateCcw className="w-3.5 h-3.5" />
                  </button>
                )}
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
  );
}
