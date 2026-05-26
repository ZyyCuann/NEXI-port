'use client';

import { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Landmark, Brain, Coins, Link2, CheckCircle2, Shield, Calendar, MapPin, FileCheck, ClipboardList } from 'lucide-react';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { GlowButton } from '@/components/ui/GlowButton';

type TabType = 'overview' | 'docs' | 'escrow' | 'blockchain' | 'release';

export default function DashboardSection() {
  const [activeTab, setActiveTab] = useState<TabType>('overview');
  const [isReleased, setIsReleased] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const handleRelease = () => {
    if (isReleased || isProcessing) return;
    setIsProcessing(true);
    setTimeout(() => {
      setIsProcessing(false);
      setIsReleased(true);
      setActiveTab('release'); // automatically switch to show success!
    }, 2000);
  };

  const handleReset = () => {
    setIsReleased(false);
    setActiveTab('overview');
  };

  const tabs = [
    { id: 'overview', label: 'Transaction Overview', icon: ClipboardList },
    { id: 'docs', label: 'Document Verification', icon: FileCheck },
    { id: 'escrow', label: 'Escrow State', icon: Coins },
    { id: 'blockchain', label: 'Blockchain Proof', icon: Link2 },
    { id: 'release', label: 'Settlement Release', icon: CheckCircle2 },
  ];

  return (
    <div className="relative w-full overflow-visible">
      <div className="absolute inset-0 grid-pattern opacity-10 dark:opacity-20 pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto">
        <SectionHeading
          title="Interactive Infrastructure Demo"
          subtitle="Simulate the actual product interface and release settlement with a single click."
          gradient
          align="center"
        />

        {/* Outer Dashboard frame */}
        <div ref={containerRef} className="mt-12 max-w-5xl mx-auto rounded-2xl border border-slate-200 dark:border-white/5 bg-[#f8fafc] dark:bg-[#060c16] shadow-2xl overflow-hidden">
          {/* Dashboard Header Mac OS style */}
          <div className="bg-slate-200/50 dark:bg-slate-950 px-6 py-4 border-b border-slate-200 dark:border-white/5 flex items-center justify-between flex-wrap gap-4">
            <div className="flex items-center gap-2">
              <span className="w-3 h-3 rounded-full bg-red-500/80" />
              <span className="w-3 h-3 rounded-full bg-yellow-500/80" />
              <span className="w-3 h-3 rounded-full bg-green-500/80" />
              <span className="h-4 w-px bg-slate-300 dark:bg-white/10 mx-2" />
              <span className="text-[10px] font-mono tracking-widest text-slate-500 uppercase">
                Console Console: v1.20
              </span>
            </div>
            <div className="flex items-center gap-3">
              <span className="text-[10px] uppercase font-mono bg-blue-500/10 text-blue-500 border border-blue-500/20 px-2.5 py-1 rounded">
                Transaction ID: NX-TRD-2048
              </span>
            </div>
          </div>

          {/* Sub Navigation Tabs */}
          <div className="flex border-b border-slate-200 dark:border-white/5 overflow-x-auto bg-slate-100/50 dark:bg-[#070e1b]">
            {tabs.map((tab) => {
              const Icon = tab.icon;
              const isActive = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id as TabType)}
                  className={`flex items-center gap-2 px-5 py-3.5 text-xs font-semibold uppercase tracking-wider cursor-pointer border-b-2 transition-all whitespace-nowrap ${
                    isActive
                      ? 'border-blue-500 text-blue-500 bg-white dark:bg-slate-950/40'
                      : 'border-transparent text-slate-500 hover:text-slate-800 dark:hover:text-slate-300 hover:bg-slate-200/20 dark:hover:bg-white/2'
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  {tab.label}
                </button>
              );
            })}
          </div>

          {/* Tab Content Display */}
          <div className="p-6 md:p-8 bg-white dark:bg-[#030712] min-h-[350px]">
            <AnimatePresence mode="wait">
              {activeTab === 'overview' && (
                <motion.div
                  key="overview"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="grid grid-cols-1 md:grid-cols-2 gap-8"
                >
                  <div className="space-y-4">
                    <h4 className="text-xs uppercase tracking-widest font-mono text-slate-400 dark:text-slate-500 font-bold">
                      Trade Configuration
                    </h4>
                    <div className="space-y-3">
                      <div className="flex justify-between items-center text-xs pb-2 border-b border-slate-100 dark:border-white/5">
                        <span className="text-slate-500">Transaction ID</span>
                        <span className="font-mono font-semibold text-slate-800 dark:text-slate-200">NX-TRD-2048</span>
                      </div>
                      <div className="flex justify-between items-center text-xs pb-2 border-b border-slate-100 dark:border-white/5">
                        <span className="text-slate-500">Indonesian Exporter</span>
                        <span className="font-semibold text-slate-800 dark:text-slate-200">Indonesian SME Exporter</span>
                      </div>
                      <div className="flex justify-between items-center text-xs pb-2 border-b border-slate-100 dark:border-white/5">
                        <span className="text-slate-500">Buyer Region</span>
                        <span className="font-semibold text-slate-800 dark:text-slate-200">Southeast Asia / Global Buyer</span>
                      </div>
                      <div className="flex justify-between items-center text-xs pb-2 border-b border-slate-100 dark:border-white/5">
                        <span className="text-slate-500">Total Transaction Value</span>
                        <span className="font-semibold font-mono text-blue-500">$125,000.00 USD</span>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <h4 className="text-xs uppercase tracking-widest font-mono text-slate-400 dark:text-slate-500 font-bold">
                      Assurance Status Overview
                    </h4>
                    <div className="space-y-3">
                      <div className="flex justify-between items-center text-xs pb-2 border-b border-slate-100 dark:border-white/5">
                        <span className="text-slate-500">Escrow State</span>
                        <span className={`font-bold px-2 py-0.5 rounded text-[10px] uppercase ${isReleased ? 'bg-emerald-500/10 text-emerald-400' : 'bg-blue-500/10 text-blue-400'}`}>
                          {isReleased ? 'Released' : 'Locked'}
                        </span>
                      </div>
                      <div className="flex justify-between items-center text-xs pb-2 border-b border-slate-100 dark:border-white/5">
                        <span className="text-slate-500">AI Document Check</span>
                        <span className="font-bold text-emerald-500 uppercase text-[10px]">Passed</span>
                      </div>
                      <div className="flex justify-between items-center text-xs pb-2 border-b border-slate-100 dark:border-white/5">
                        <span className="text-slate-500">Dispute Status</span>
                        <span className="font-bold text-emerald-500 uppercase text-[10px]">Clear</span>
                      </div>
                      <div className="flex justify-between items-center text-xs">
                        <span className="text-slate-500">Settlement Status</span>
                        <span className={`font-bold text-[10px] uppercase ${isReleased ? 'text-emerald-500' : 'text-amber-500'}`}>
                          {isReleased ? 'Completed / Paid' : 'Pending Conditions'}
                        </span>
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}

              {activeTab === 'docs' && (
                <motion.div
                  key="docs"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="space-y-6"
                >
                  <div className="flex items-center justify-between">
                    <h4 className="text-xs uppercase tracking-widest font-mono text-slate-400 dark:text-slate-500 font-bold">
                      AI Document Verification Report
                    </h4>
                    <span className="text-xs text-emerald-500 font-bold border border-emerald-500/20 bg-emerald-500/5 px-2.5 py-1 rounded">
                      VERIFICATION PASSED (100% MATCH)
                    </span>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    <div className="p-4 rounded-xl border border-slate-200 dark:border-white/5 bg-slate-50 dark:bg-white/2">
                      <div className="flex justify-between mb-2">
                        <span className="text-xs font-bold text-slate-700 dark:text-slate-300">Commercial Invoice</span>
                        <span className="text-[9px] font-mono text-emerald-500 uppercase font-bold">Matched</span>
                      </div>
                      <p className="text-[11px] text-slate-500 leading-relaxed">
                        Quantities, amounts, and buyer/seller registration ids matched legal records.
                      </p>
                    </div>

                    <div className="p-4 rounded-xl border border-slate-200 dark:border-white/5 bg-slate-50 dark:bg-white/2">
                      <div className="flex justify-between mb-2">
                        <span className="text-xs font-bold text-slate-700 dark:text-slate-300">Bill of Lading</span>
                        <span className="text-[9px] font-mono text-emerald-500 uppercase font-bold">Verified</span>
                      </div>
                      <p className="text-[11px] text-slate-500 leading-relaxed">
                        Shipping container metadata and carrier signatures matched vessel schedule APIs.
                      </p>
                    </div>

                    <div className="p-4 rounded-xl border border-slate-200 dark:border-white/5 bg-slate-50 dark:bg-white/2">
                      <div className="flex justify-between mb-2">
                        <span className="text-xs font-bold text-slate-700 dark:text-slate-300">Customs Declaration</span>
                        <span className="text-[9px] font-mono text-emerald-500 uppercase font-bold">Cleared</span>
                      </div>
                      <p className="text-[11px] text-slate-500 leading-relaxed">
                        HS Codes and tariff calculations cross-referenced successfully against Bea Cukai databases.
                      </p>
                    </div>
                  </div>
                </motion.div>
              )}

              {activeTab === 'escrow' && (
                <motion.div
                  key="escrow"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center"
                >
                  <div className="space-y-4">
                    <h4 className="text-xs uppercase tracking-widest font-mono text-slate-400 dark:text-slate-500 font-bold">
                      Escrow Tokenization Specifications
                    </h4>
                    <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                      NEXII PORT tokenizes transaction states as a secure, non-tradable, non-speculative digital ledger unit. This guarantees payment security without public market exposure.
                    </p>
                    <div className="space-y-2 text-xs">
                      <div className="flex justify-between pb-1 border-b border-slate-100 dark:border-white/5">
                        <span className="text-slate-500">Token Asset Code</span>
                        <span className="font-mono text-slate-800 dark:text-slate-200">NXP-ESC-2048</span>
                      </div>
                      <div className="flex justify-between pb-1 border-b border-slate-100 dark:border-white/5">
                        <span className="text-slate-500">Security Encrypted</span>
                        <span className="text-emerald-500 font-bold">AES-256</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-slate-500">Speculative Assets</span>
                        <span className="text-red-400 font-bold">NONE / DISABLED</span>
                      </div>
                    </div>
                  </div>

                  <div className="flex flex-col items-center justify-center p-6 border border-slate-200 dark:border-white/5 rounded-2xl bg-slate-50 dark:bg-slate-950">
                    <Coins className={`w-16 h-16 mb-3 transition-colors ${isReleased ? 'text-emerald-500' : 'text-blue-500 animate-pulse'}`} />
                    <span className="text-[10px] uppercase font-mono tracking-widest text-slate-500">
                      Escrow Vault Status
                    </span>
                    <span className={`text-lg font-bold uppercase ${isReleased ? 'text-emerald-500' : 'text-blue-500'}`}>
                      {isReleased ? 'State Released' : 'State Locked'}
                    </span>
                    <span className="text-[10px] font-mono text-slate-400 mt-1">$125,000.00 USD</span>
                  </div>
                </motion.div>
              )}

              {activeTab === 'blockchain' && (
                <motion.div
                  key="blockchain"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="space-y-6"
                >
                  <div className="flex items-center justify-between">
                    <h4 className="text-xs uppercase tracking-widest font-mono text-slate-400 dark:text-slate-500 font-bold">
                      Ledger Proof Transactions
                    </h4>
                    <span className="text-xs font-mono text-slate-500">Document Hash: 0x9F3A...82C</span>
                  </div>

                  <div className="border border-slate-200 dark:border-white/5 rounded-xl overflow-hidden font-mono text-[10px] text-slate-600 dark:text-slate-400">
                    <div className="bg-slate-100 dark:bg-white/2 p-3 border-b border-slate-200 dark:border-white/5 grid grid-cols-4 font-bold uppercase text-[9px] tracking-wider text-slate-500">
                      <span>Event Log</span>
                      <span>Actor</span>
                      <span>Hash Proof</span>
                      <span className="text-right">Audit Status</span>
                    </div>
                    <div className="p-3 border-b border-slate-100 dark:border-white/5 grid grid-cols-4">
                      <span>Escrow Initialized</span>
                      <span>Escrow Module</span>
                      <span>0x7f3a...e291</span>
                      <span className="text-right text-emerald-500">Verified</span>
                    </div>
                    <div className="p-3 border-b border-slate-100 dark:border-white/5 grid grid-cols-4">
                      <span>AI Document Audit Passed</span>
                      <span>AI Engine</span>
                      <span>0x9F3A...82C</span>
                      <span className="text-right text-emerald-500">Verified</span>
                    </div>
                    <div className="p-3 grid grid-cols-4">
                      <span>Settlement Disbursed</span>
                      <span>Settlement Node</span>
                      {isReleased ? (
                        <>
                          <span>0x10b9...43cf</span>
                          <span className="text-right text-emerald-500 font-bold">Finalized</span>
                        </>
                      ) : (
                        <>
                          <span className="text-slate-400">Pending Release...</span>
                          <span className="text-right text-amber-500">Standby</span>
                        </>
                      )}
                    </div>
                  </div>
                </motion.div>
              )}

              {activeTab === 'release' && (
                <motion.div
                  key="release"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="flex flex-col items-center justify-center text-center py-6"
                >
                  {isReleased ? (
                    <div className="space-y-4 max-w-md">
                      <div className="w-16 h-16 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-500 flex items-center justify-center mx-auto shadow-[0_0_20px_rgba(16,185,129,0.2)]">
                        <CheckCircle2 className="w-8 h-8" />
                      </div>
                      <div>
                        <h4 className="font-heading font-bold text-xl sm:text-2xl text-slate-800 dark:text-white mb-2">
                          Settlement Completed
                        </h4>
                        <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 leading-relaxed">
                          Escrow has successfully released value. Non-tradable representational state finalized and standard physical bank transfer disbursed to SME exporter accounts.
                        </p>
                      </div>
                      <div className="pt-2">
                        <button
                          onClick={handleReset}
                          className="px-4 py-2 border border-slate-200 dark:border-white/10 hover:border-slate-300 dark:hover:border-white/20 text-xs uppercase font-mono tracking-wider font-bold rounded-lg cursor-pointer text-slate-600 dark:text-slate-400 hover:text-slate-800 dark:hover:text-white transition-colors"
                        >
                          Reset Simulation
                        </button>
                      </div>
                    </div>
                  ) : (
                    <div className="space-y-6 max-w-md">
                      <div className="w-16 h-16 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-500 flex items-center justify-center mx-auto">
                        <Shield className="w-8 h-8 animate-pulse" />
                      </div>
                      <div>
                        <h4 className="font-heading font-bold text-xl sm:text-2xl text-slate-800 dark:text-white mb-2">
                          Settlement Awaiting Release
                        </h4>
                        <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                          AI verification passed, Escrow value locked. Ready for human authorization to disburse settlement to domestic exporter.
                        </p>
                      </div>
                      <div>
                        <button
                          onClick={handleRelease}
                          disabled={isProcessing}
                          className={`w-full py-3 px-6 rounded-lg font-sans font-bold text-sm cursor-pointer transition-colors ${
                            isProcessing
                              ? 'bg-slate-800 text-slate-500 cursor-not-allowed border border-slate-700/50'
                              : 'bg-blue-500 text-white hover:bg-blue-600 shadow-[0_0_20px_rgba(59,130,246,0.3)]'
                          }`}
                        >
                          {isProcessing ? (
                            <span className="flex items-center justify-center gap-2">
                              <span className="w-4 h-4 rounded-full border-2 border-slate-500 border-t-white animate-spin" />
                              Finalizing Settlement...
                            </span>
                          ) : (
                            'Release Settlement'
                          )}
                        </button>
                      </div>
                    </div>
                  )}
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </div>
  );
}
