'use client';

import { useEffect, useRef, useState, type CSSProperties } from 'react';
import Link from 'next/link';
import { useDevicePreview } from '@/lib/device-preview-context';
import { Navbar } from '@/components/layout/Navbar';
import { TradeBackground } from '@/components/ui/TradeBackground';
import { TypingIntro } from '@/components/ui/TypingIntro';
import { 
  ArrowRight, 
  Lock, 
  Cpu, 
  Globe, 
  Activity, 
  Workflow, 
  TrendingUp, 
  Play, 
  CheckCircle,
  HelpCircle,
  ShieldCheck,
  Zap,
  Layers,
  Wallet,
  BrainCircuit,
  Blocks,
  Send,
  Users2,
  Tv,
  Check,
  FileText,
  FileCheck,
  AlertCircle
} from 'lucide-react';

// Reusable Section Header Component
interface SectionHeaderProps {
  badge: string;
  title: string;
  description: string;
}

function SectionHeader({ badge, title, description }: SectionHeaderProps) {
  return (
    <div className="max-w-3xl mb-12 md:mb-16">
      <span className="inline-flex items-center px-3.5 py-1 text-xs font-bold tracking-wider uppercase rounded-full bg-blue-500/10 text-blue-600 dark:bg-cyan-500/10 dark:text-cyan-400 mb-4 transition-colors duration-300">
        {badge}
      </span>
      <h2 className="text-3xl md:text-5xl font-heading font-extrabold text-slate-900 dark:text-white tracking-tight mb-4 transition-colors duration-300 bg-gradient-to-r from-slate-900 to-slate-700 dark:from-white dark:to-slate-300 bg-clip-text text-transparent">
        {title}
      </h2>
      <p className="text-base md:text-lg text-slate-600 dark:text-slate-400 leading-relaxed transition-colors duration-300">
        {description}
      </p>
    </div>
  );
}

// Reusable Spacious Card Component
interface CardProps {
  title: string;
  description: string;
  badge?: string;
  icon?: React.ReactNode;
  className?: string;
  style?: CSSProperties;
}

function Card({ title, description, badge, icon, className = '', style }: CardProps) {
  return (
    <div
      className={`group relative p-8 rounded-2xl border transition-all duration-300 bg-white/60 dark:bg-[#070e1a]/40 border-slate-200/60 dark:border-white/[0.06] hover:border-blue-500/40 dark:hover:border-cyan-500/40 hover:shadow-[0_8px_30px_rgba(0,0,0,0.03)] dark:hover:shadow-[0_8px_30px_rgba(6,182,212,0.08)] backdrop-blur-sm overflow-hidden ${className}`}
      style={style}
    >
      {/* Subtle internal glowing layer on hover */}
      <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none bg-gradient-to-tr from-blue-500/5 to-cyan-500/5 dark:from-blue-500/10 dark:to-cyan-500/10" />
      
      <div className="relative z-10">
        {icon && (
          <div className="text-blue-600 dark:text-cyan-400 mb-6 w-8 h-8 transition-transform group-hover:scale-105 duration-300">
            {icon}
          </div>
        )}
        <div className="flex items-center justify-between mb-3">
          <h3 className="text-xl font-bold tracking-tight text-slate-900 dark:text-white transition-colors duration-300">
            {title}
          </h3>
          {badge && (
            <span className="text-xs font-semibold px-2.5 py-0.5 rounded-full bg-blue-500/10 text-blue-600 dark:bg-cyan-500/10 dark:text-cyan-400 transition-colors duration-300">
              {badge}
            </span>
          )}
        </div>
        <p className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed transition-colors duration-300">
          {description}
        </p>
      </div>
    </div>
  );
}

const initialDemoStatuses = {
  escrow: 'Waiting',
  ai: 'Standby',
  hash: 'Not Recorded',
  shipment: 'Pending',
  dispute: 'Clear',
  settlement: 'Locked',
};

const demoSteps = [
  {
    title: 'Trade Terms Agreed',
    activity: 'Trade terms confirmed by both parties.',
    statuses: initialDemoStatuses,
  },
  {
    title: 'Fiat Payment Initiated',
    activity: 'Fiat payment has been initiated by buyer.',
    statuses: {
      escrow: 'Payment Initiated',
      ai: 'Standby',
      hash: 'Not Recorded',
      shipment: 'Pending',
      dispute: 'Clear',
      settlement: 'Locked',
    },
  },
  {
    title: 'Tokenized Escrow State Created',
    activity: 'Transaction value is represented as tokenized escrow state.',
    statuses: {
      escrow: 'Locked',
      ai: 'Standby',
      hash: 'Not Recorded',
      shipment: 'Pending',
      dispute: 'Clear',
      settlement: 'Locked',
    },
  },
  {
    title: 'AI Verifies Documents',
    activity: 'AI is verifying invoice, agreement, and shipment data.',
    statuses: {
      escrow: 'Locked',
      ai: 'Checking',
      hash: 'Pending',
      shipment: 'Pending',
      dispute: 'Clear',
      settlement: 'Locked',
    },
  },
  {
    title: 'Blockchain Records Proof',
    activity: 'Blockchain audit trail records verification proof.',
    statuses: {
      escrow: 'Locked',
      ai: 'Passed',
      hash: 'Recorded',
      shipment: 'In Transit',
      dispute: 'Clear',
      settlement: 'Locked',
    },
  },
  {
    title: 'Conditions Confirmed',
    activity: 'Trade conditions have been confirmed.',
    statuses: {
      escrow: 'Verified',
      ai: 'Passed',
      hash: 'Recorded',
      shipment: 'Confirmed',
      dispute: 'Clear',
      settlement: 'Ready to Release',
    },
  },
  {
    title: 'Settlement Released',
    activity: 'Settlement has been released to the seller.',
    statuses: {
      escrow: 'Released',
      ai: 'Passed',
      hash: 'Recorded',
      shipment: 'Confirmed',
      dispute: 'Clear',
      settlement: 'Completed',
    },
  },
];

const progressByStep = [0, 14, 28, 42, 56, 70, 85, 100];

const processRailSteps = [
  { step: '01', title: 'Trade Terms Agreed', desc: 'Exporter and Buyer establish and digitally sign parameters inside the escrow contract.', icon: FileCheck, state: 'Completed' },
  { step: '02', title: 'Fiat Payment Initiated', desc: 'Buyer initiates deposit through aligned international payment pathways or direct bank integrations.', icon: Wallet, state: 'Completed' },
  { step: '03', title: 'Tokenized Escrow State Created', desc: 'System holds a secure digital record representing the locked transaction value in the portal workspace.', icon: ShieldCheck, state: 'Completed' },
  { step: '04', title: 'AI Verifies Documents', desc: 'Automated document parsing algorithms check bills of lading, customs inputs, and invoices for accuracy.', icon: BrainCircuit, state: 'Processing' },
  { step: '05', title: 'Blockchain Records Proof', desc: 'Critical transactional milestones are hashed and recorded permanently for public transparency.', icon: Blocks, state: 'Pending' },
  { step: '06', title: 'Conditions Confirmed', desc: 'Compliance triggers release status once validation checks match shipping metrics successfully.', icon: CheckCircle, state: 'Pending' },
  { step: '07', title: 'Settlement Released', desc: "Locked assets are routed straight to the exporter's corporate banking treasury without delays.", icon: Send, state: 'Pending' },
];

const ecosystemNodes = [
  {
    title: 'Bea Cukai',
    type: 'Domestic',
    desc: 'Customs document reference and HS code validation pathway.',
    position: 'lg:left-[45%] lg:top-[8%]',
  },
  {
    title: 'Kemendag',
    type: 'Domestic',
    desc: 'Trade policy alignment and SME export facilitation.',
    position: 'lg:left-[68%] lg:top-[18%]',
  },
  {
    title: 'Bank Indonesia Alignment',
    type: 'Domestic',
    desc: 'Future Digital Rupiah and programmable settlement ecosystem alignment.',
    position: 'lg:left-[75%] lg:top-[48%]',
  },
  {
    title: 'Komdigi / BSrE',
    type: 'Domestic',
    desc: 'Digital signature, electronic consent, and document authenticity.',
    position: 'lg:left-[62%] lg:top-[75%]',
  },
  {
    title: 'KADIN / Export Communities',
    type: 'Domestic',
    desc: 'SME exporter onboarding, education, and pilot ecosystem.',
    position: 'lg:left-[34%] lg:top-[78%]',
  },
  {
    title: 'Logistics APIs',
    type: 'International',
    desc: 'Shipment tracking and delivery condition data.',
    position: 'lg:left-[12%] lg:top-[58%]',
  },
  {
    title: 'Trade Document Standards',
    type: 'International',
    desc: 'ICC, Incoterms, and digital trade documentation alignment.',
    position: 'lg:left-[10%] lg:top-[28%]',
  },
  {
    title: 'Arbitration / Dispute Partners',
    type: 'International',
    desc: 'Mediation and dispute resolution pathway.',
    position: 'lg:left-[25%] lg:top-[12%]',
  },
  {
    title: 'Future CBDC Interoperability',
    type: 'International',
    desc: 'Future-ready settlement rails and cross-border programmable infrastructure.',
    position: 'lg:left-[18%] lg:top-[80%]',
  },
];

export default function HomeClient() {
  const { device } = useDevicePreview();
  const [currentStep, setCurrentStep] = useState(0);
  const [isSimulating, setIsSimulating] = useState(false);
  const [activityLog, setActivityLog] = useState<string[]>([]);
  const simulationTimersRef = useRef<ReturnType<typeof setTimeout>[]>([]);

  const statuses = currentStep > 0 ? demoSteps[currentStep - 1].statuses : initialDemoStatuses;
  const progressPercent = progressByStep[currentStep];

  useEffect(() => {
    return () => {
      simulationTimersRef.current.forEach((timer) => clearTimeout(timer));
      simulationTimersRef.current = [];
    };
  }, []);

  const startSimulation = () => {
    if (isSimulating) return;

    simulationTimersRef.current.forEach((timer) => clearTimeout(timer));
    simulationTimersRef.current = [];

    setCurrentStep(1);
    setActivityLog([demoSteps[0].activity]);
    setIsSimulating(true);

    demoSteps.slice(1).forEach((step, idx) => {
      const stepNumber = idx + 2;
      const timer = setTimeout(() => {
        setCurrentStep(stepNumber);
        setActivityLog((prev) => [...prev, step.activity]);

        if (stepNumber === demoSteps.length) {
          simulationTimersRef.current = [];
          setIsSimulating(false);
        }
      }, (stepNumber - 1) * 900);

      simulationTimersRef.current.push(timer);
    });
  };

  const statusTone = (value: string) => {
    if (['Released', 'Passed', 'Recorded', 'Confirmed', 'Completed', 'Clear', 'Verified'].includes(value)) {
      return 'bg-emerald-500 text-emerald-600 dark:text-emerald-400';
    }

    if (['Locked', 'Pending', 'Payment Initiated', 'Checking', 'In Transit', 'Ready to Release'].includes(value)) {
      return 'bg-amber-500 text-amber-600 dark:text-amber-400';
    }

    return 'bg-slate-400 text-slate-500 dark:text-slate-400';
  };

  const getWidthClass = () => {
    switch (device) {
      case 'mobile':
        return 'max-w-[390px] border-x border-slate-200/50 dark:border-white/10 shadow-[0_0_80px_rgba(0,0,0,0.25)] dark:shadow-[0_0_80px_rgba(0,0,0,0.5)] my-12 rounded-[2.5rem] bg-white dark:bg-[#030712] relative outline outline-12 outline-slate-200/80 dark:outline-slate-900';
      case 'tablet':
        return 'max-w-[768px] border-x border-slate-200/50 dark:border-white/10 shadow-[0_0_80px_rgba(0,0,0,0.25)] dark:shadow-[0_0_80px_rgba(0,0,0,0.5)] my-12 rounded-[1.5rem] bg-white dark:bg-[#030712] relative outline outline-12 outline-slate-200/80 dark:outline-slate-900';
      case 'desktop':
      default:
        return 'max-w-full';
    }
  };

  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <div className="relative isolate flex flex-col min-h-screen bg-slate-100 dark:bg-[#070e1a] transition-colors duration-300 overflow-x-hidden">
      <Navbar />
      <TradeBackground />
      <div className="relative z-10 flex-1 flex justify-center w-full">
        <main className={`relative z-10 w-full bg-[linear-gradient(to_bottom,rgba(248,250,252,0.78),rgba(255,255,255,0.62),rgba(241,245,249,0.78))] dark:bg-[linear-gradient(to_bottom,rgba(3,7,18,0.72),rgba(5,11,24,0.62),rgba(2,5,12,0.72))] transition-colors duration-300 min-h-screen overflow-x-hidden ${getWidthClass()}`}>
          
          {/* Section 1: Hero Section */}
          <section id="hero" className="relative pt-40 pb-32">
            {/* Subtle glow spots behind hero in dark mode */}
            <div className="hidden dark:block absolute top-12 left-1/4 w-[500px] h-[500px] rounded-full bg-blue-500/[0.02] blur-[100px] pointer-events-none" />
            <div className="hidden dark:block absolute top-28 right-1/4 w-[400px] h-[400px] rounded-full bg-cyan-500/[0.02] blur-[120px] pointer-events-none" />

            <div className="mx-auto max-w-7xl px-6 md:px-10 relative z-10">
              <div className="max-w-4xl mb-16">
                <span className="inline-flex items-center gap-1.5 px-3.5 py-1.5 text-xs font-bold tracking-wider uppercase rounded-full bg-gradient-to-r from-blue-500/10 to-cyan-500/10 text-blue-600 dark:text-cyan-400 border border-blue-500/10 dark:border-cyan-500/10 mb-6 transition-colors duration-300">
                  <Zap className="w-3.5 h-3.5 text-blue-500 dark:text-cyan-400" /> Nusantara Export and Import Infrastructure
                </span>
                <h1 className="text-4xl sm:text-5xl md:text-7xl font-heading font-extrabold text-slate-900 dark:text-white tracking-tight mb-6 transition-colors duration-300 leading-[1.1]">
                  Reinventing <span className="bg-gradient-to-r from-blue-600 to-cyan-500 dark:from-blue-400 dark:to-cyan-300 bg-clip-text text-transparent">Trade Trust</span>.
                </h1>
                <p className="text-lg md:text-xl text-slate-600 dark:text-slate-400 leading-relaxed mb-10 max-w-3xl transition-colors duration-300">
                  NEXII PORT is a programmable trade assurance infrastructure designed to make export-import transactions more transparent, automated, and future-ready.
                </p>
                <div className="flex flex-wrap gap-4">
                  <button 
                    onClick={() => scrollToSection('flow')}
                    className="px-6 py-3.5 bg-gradient-to-r from-blue-600 to-cyan-500 hover:from-blue-500 hover:to-cyan-400 text-white font-semibold rounded-xl transition-all duration-300 shadow-md shadow-blue-500/10 hover:shadow-cyan-500/20 flex items-center gap-2 cursor-pointer hover:-translate-y-0.5"
                  >
                    Explore Flow <ArrowRight className="w-4 h-4" />
                  </button>
                  <Link
                    href="/try-now"
                    className="px-6 py-3.5 bg-slate-950 hover:bg-slate-800 dark:bg-cyan-400 dark:hover:bg-cyan-300 text-white dark:text-slate-950 font-semibold rounded-xl transition-all duration-300 shadow-md shadow-slate-900/10 dark:shadow-cyan-500/20 flex items-center gap-2 cursor-pointer hover:-translate-y-0.5"
                  >
                    Try Now <ArrowRight className="w-4 h-4" />
                  </Link>
                  <button 
                    onClick={() => scrollToSection('demo')}
                    className="px-6 py-3.5 bg-white hover:bg-slate-50 dark:bg-white/5 dark:hover:bg-white/10 text-slate-900 dark:text-white font-semibold rounded-xl transition-all duration-300 border border-slate-200/60 dark:border-white/10 hover:border-slate-300 dark:hover:border-white/20 cursor-pointer hover:-translate-y-0.5 shadow-sm"
                  >
                    View Demo
                  </button>
                </div>
              </div>

              {/* Hero Badges / Cards */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
                <div className="p-6 bg-white/50 dark:bg-[#0a1220]/30 border border-slate-200/50 dark:border-white/[0.04] rounded-xl flex items-start gap-4 backdrop-blur-sm hover:border-blue-500/30 dark:hover:border-cyan-500/30 transition-colors duration-300">
                  <div className="p-2.5 bg-blue-500/10 text-blue-600 dark:text-cyan-400 rounded-lg shrink-0"><Cpu className="w-5 h-5" /></div>
                  <div>
                    <h3 className="font-bold text-slate-900 dark:text-white text-sm">AI Verification</h3>
                    <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">Real-time digital audits.</p>
                  </div>
                </div>
                <div className="p-6 bg-white/50 dark:bg-[#0a1220]/30 border border-slate-200/50 dark:border-white/[0.04] rounded-xl flex items-start gap-4 backdrop-blur-sm hover:border-blue-500/30 dark:hover:border-cyan-500/30 transition-colors duration-300">
                  <div className="p-2.5 bg-blue-500/10 text-blue-600 dark:text-cyan-400 rounded-lg shrink-0"><Lock className="w-5 h-5" /></div>
                  <div>
                    <h3 className="font-bold text-slate-900 dark:text-white text-sm">Tokenized Escrow State</h3>
                    <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">Safe automated assurance.</p>
                  </div>
                </div>
                <div className="p-6 bg-white/50 dark:bg-[#0a1220]/30 border border-slate-200/50 dark:border-white/[0.04] rounded-xl flex items-start gap-4 backdrop-blur-sm hover:border-blue-500/30 dark:hover:border-cyan-500/30 transition-colors duration-300">
                  <div className="p-2.5 bg-blue-500/10 text-blue-600 dark:text-cyan-400 rounded-lg shrink-0"><Layers className="w-5 h-5" /></div>
                  <div>
                    <h3 className="font-bold text-slate-900 dark:text-white text-sm">Blockchain Audit Trail</h3>
                    <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">Immutable transaction log.</p>
                  </div>
                </div>
                <div className="p-6 bg-white/50 dark:bg-[#0a1220]/30 border border-slate-200/50 dark:border-white/[0.04] rounded-xl flex items-start gap-4 backdrop-blur-sm hover:border-blue-500/30 dark:hover:border-cyan-500/30 transition-colors duration-300">
                  <div className="p-2.5 bg-blue-500/10 text-blue-600 dark:text-cyan-400 rounded-lg shrink-0"><Globe className="w-5 h-5" /></div>
                  <div>
                    <h3 className="font-bold text-slate-900 dark:text-white text-sm">Future CBDC Ready</h3>
                    <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">Sovereign settlement pathways.</p>
                  </div>
                </div>
              </div>

            </div>
          </section>

          {/* Section 1.5: Horizontal Moving Marquee Section */}
          <section className="relative py-8 border-y border-slate-200/40 dark:border-white/5 bg-slate-50/30 dark:bg-white/[0.01] overflow-hidden">
            {/* Fade masks on the edges */}
            <div className="absolute inset-y-0 left-0 w-24 bg-gradient-to-r from-[#f8fafc] dark:from-[#030712] to-transparent z-10 pointer-events-none" />
            <div className="absolute inset-y-0 right-0 w-24 bg-gradient-to-l from-[#f1f5f9] dark:from-[#02050c] to-transparent z-10 pointer-events-none" />
            
            <div className="flex overflow-hidden">
              <div className="animate-marquee flex items-center gap-16 shrink-0 pr-16">
                {[
                  "AI Verification",
                  "Tokenized Escrow State",
                  "Blockchain Audit Trail",
                  "Programmable Settlement",
                  "Future CBDC Ready",
                  "Trade Assurance",
                  "Cross-Border Trust",
                  "Digital Export Infrastructure"
                ].map((item, idx) => (
                  <div key={idx} className="flex items-center gap-3 text-xs font-bold tracking-wider uppercase text-slate-500 dark:text-slate-400 whitespace-nowrap">
                    <span className="w-1.5 h-1.5 rounded-full bg-blue-600 dark:bg-cyan-400" />
                    <span>{item}</span>
                  </div>
                ))}
              </div>
              {/* Duplicate list for seamless loop */}
              <div className="animate-marquee flex items-center gap-16 shrink-0 pr-16" aria-hidden="true">
                {[
                  "AI Verification",
                  "Tokenized Escrow State",
                  "Blockchain Audit Trail",
                  "Programmable Settlement",
                  "Future CBDC Ready",
                  "Trade Assurance",
                  "Cross-Border Trust",
                  "Digital Export Infrastructure"
                ].map((item, idx) => (
                  <div key={`dup-${idx}`} className="flex items-center gap-3 text-xs font-bold tracking-wider uppercase text-slate-500 dark:text-slate-400 whitespace-nowrap">
                    <span className="w-1.5 h-1.5 rounded-full bg-blue-600 dark:bg-cyan-400" />
                    <span>{item}</span>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* Section 2: Problem Section */}
          <section id="problem" className="py-32 border-t border-slate-200/40 dark:border-white/5 scroll-mt-20">
            <div className="mx-auto max-w-7xl px-6 md:px-10">
              <TypingIntro
                label="TRUST GAP"
                headline="Trade is global. Trust is still fragmented."
                subheadline="SME exporters and international buyers still face friction, uncertainty, and limited visibility across cross-border transactions."
              />
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-10">
                <Card 
                  icon={<Users2 className="w-6 h-6" />}
                  title="Access Constraints" 
                  description="SMEs struggle to access traditional, restrictive trade assurance tools due to high capitalization demands." 
                  className="premium-3d-card stagger-fade-up"
                  style={{ animationDelay: '0ms' }}
                />
                <Card 
                  icon={<Layers className="w-6 h-6" />}
                  title="Complex LC Systems" 
                  description="Letter of Credit (LC) and conventional bank guarantee processes are complex, time-consuming, and highly costly." 
                  className="premium-3d-card stagger-fade-up"
                  style={{ animationDelay: '120ms' }}
                />
                <Card 
                  icon={<Globe className="w-6 h-6" />}
                  title="Visibility Gap" 
                  description="International buyers and sellers lack unified, transparent visibility over ongoing transactional workflows." 
                  className="premium-3d-card stagger-fade-up"
                  style={{ animationDelay: '240ms' }}
                />
                <Card 
                  icon={<FileText className="w-6 h-6" />}
                  title="Document Friction" 
                  description="Export-import paper trails create extreme administrative friction, errors, and significant dispute risks." 
                  className="premium-3d-card stagger-fade-up"
                  style={{ animationDelay: '360ms' }}
                />
                <Card 
                  icon={<Activity className="w-6 h-6" />}
                  title="Settlement Delays" 
                  description="Protracted settlement clearings tie up SME working capital, reducing trade frequency and transaction confidence." 
                  className="premium-3d-card stagger-fade-up"
                  style={{ animationDelay: '480ms' }}
                />
              </div>
            </div>
          </section>

          {/* Section 3: Solution Section */}
          <section id="solution" className="py-32 border-t border-slate-200/40 dark:border-white/5 scroll-mt-20">
            <div className="mx-auto max-w-7xl px-6 md:px-10">
              <TypingIntro
                label="NEXII PORT SOLUTION"
                headline="A neutral infrastructure layer for digital trade assurance."
                subheadline="NEXII PORT combines AI verification, tokenized escrow state, and blockchain audit trail into one programmable trade workflow."
              />
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
                <Card 
                  icon={<Cpu className="w-6 h-6" />}
                  title="AI Verification" 
                  description="AI assists document checking, invoice review, anomaly detection, and transaction workflow." 
                  badge="ML Audit"
                  className="stagger-fade-up"
                  style={{ animationDelay: '0ms' }}
                />
                <Card 
                  icon={<Lock className="w-6 h-6" />}
                  title="Tokenized Escrow State" 
                  description="Transaction value is represented as a non-tradable digital escrow state inside the platform workflow." 
                  badge="Automated"
                  className="stagger-fade-up"
                  style={{ animationDelay: '120ms' }}
                />
                <Card 
                  icon={<Layers className="w-6 h-6" />}
                  title="Blockchain Audit Trail" 
                  description="Key transaction events are recorded as immutable proof for transparency and monitoring." 
                  badge="Immutable"
                  className="stagger-fade-up"
                  style={{ animationDelay: '240ms' }}
                />
                <Card 
                  icon={<Globe className="w-6 h-6" />}
                  title="Future CBDC Ready" 
                  description="The architecture is designed to align with future programmable settlement and CBDC ecosystems." 
                  badge="Settlement"
                  className="stagger-fade-up"
                  style={{ animationDelay: '360ms' }}
                />
              </div>
            </div>
          </section>

          {/* Section 4: Flow Section */}
          <section id="flow" className="py-32 border-t border-slate-200/40 dark:border-white/5 scroll-mt-20">
            <div className="mx-auto max-w-7xl px-6 md:px-10">
              <SectionHeader 
                badge="How It Works" 
                title="How NEXII PORT Works" 
                description="Our structured transaction lifecycle handles settlements securely, taking parties through clean, automated verification stages."
              />
              <div className="relative overflow-hidden rounded-2xl border border-slate-200/60 bg-white/65 p-6 shadow-sm backdrop-blur-sm dark:border-white/[0.06] dark:bg-[#070e1a]/45 md:p-8">
                <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,rgba(6,182,212,0.10),transparent_45%)] dark:bg-[radial-gradient(circle_at_50%_0%,rgba(6,182,212,0.14),transparent_48%)]" />
                <div className="relative mb-8 flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
                  <div>
                    <p className="text-xs font-bold uppercase tracking-widest text-blue-600 dark:text-cyan-400">Transaction Rail</p>
                    <h3 className="mt-2 text-2xl font-extrabold tracking-tight text-slate-900 dark:text-white">Seven checkpoints, one verified release path.</h3>
                  </div>
                  <div className="rounded-xl border border-slate-200/70 bg-slate-50/80 px-4 py-3 text-xs font-bold uppercase tracking-widest text-slate-500 dark:border-white/10 dark:bg-white/[0.03] dark:text-slate-400">
                    Pipeline status: <span className="text-blue-600 dark:text-cyan-400">Processing</span>
                  </div>
                </div>

                <div className="relative overflow-x-auto pb-3">
                  <div className="relative min-w-[980px]">
                    <div className="absolute left-0 right-0 top-[3.25rem] h-px bg-slate-200 dark:bg-white/10" />
                    <div className="absolute left-0 top-[3.25rem] h-px w-[52%] bg-gradient-to-r from-blue-600 to-cyan-400 shadow-[0_0_18px_rgba(34,211,238,0.35)] transition-[width] duration-700" />
                    <div className="grid grid-cols-7 gap-4">
                      {processRailSteps.map((item) => {
                        const Icon = item.icon;
                        const isCompleted = item.state === 'Completed';
                        const isActive = item.state === 'Processing';

                        return (
                          <div key={item.step} className="group relative flex min-h-[260px] flex-col items-center text-center">
                            <div className={`relative z-10 flex h-24 w-24 items-center justify-center rounded-2xl border transition-all duration-300 ${
                              isCompleted
                                ? 'border-blue-500/40 bg-blue-500/10 text-blue-600 dark:border-cyan-400/40 dark:bg-cyan-400/10 dark:text-cyan-300'
                                : isActive
                                  ? 'border-cyan-400/70 bg-cyan-400/15 text-cyan-600 shadow-[0_0_32px_rgba(34,211,238,0.25)] dark:text-cyan-200 motion-safe:animate-pulse'
                                  : 'border-slate-200 bg-white/70 text-slate-400 dark:border-white/10 dark:bg-slate-950/60 dark:text-slate-500'
                            }`}>
                              <div className="absolute inset-2 rounded-xl border border-white/50 dark:border-white/5" />
                              {isCompleted ? <CheckCircle className="h-7 w-7" /> : <Icon className="h-7 w-7" />}
                            </div>
                            <span className="mt-5 text-[10px] font-extrabold uppercase tracking-widest text-slate-400 dark:text-slate-500">
                              Step {item.step}
                            </span>
                            <h4 className={`mt-2 min-h-[44px] text-sm font-bold leading-snug transition-colors duration-300 ${
                              isActive ? 'text-cyan-600 dark:text-cyan-300' : 'text-slate-900 dark:text-white'
                            }`}>
                              {item.title}
                            </h4>
                            <span className={`mt-3 rounded-full px-2.5 py-1 text-[10px] font-extrabold uppercase tracking-widest ${
                              isCompleted
                                ? 'bg-blue-500/10 text-blue-600 dark:bg-cyan-400/10 dark:text-cyan-300'
                                : isActive
                                  ? 'bg-cyan-400/15 text-cyan-600 dark:text-cyan-300'
                                  : 'bg-slate-100 text-slate-400 dark:bg-white/5 dark:text-slate-500'
                            }`}>
                              {item.state}
                            </span>
                            <p className="mt-4 text-xs leading-relaxed text-slate-500 transition-colors duration-300 group-hover:text-slate-700 dark:text-slate-400 dark:group-hover:text-slate-300">
                              {item.desc}
                            </p>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Section 5: Infrastructure Section */}
          <section id="infrastructure" className="py-32 border-t border-slate-200/40 dark:border-white/5 scroll-mt-20">
            <div className="mx-auto max-w-7xl px-6 md:px-10">
              <SectionHeader 
                badge="Platform Architecture" 
                title="Built as programmable trade infrastructure." 
                description="NEXII PORT utilizes a modern, tiered architecture that isolates logic layers to preserve compliance, performance, and operational durability."
              />
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-10">
                <Card 
                  icon={<Users2 className="w-6 h-6" />}
                  title="User Layer" 
                  description="Exporter and buyer interact through a guided, user-friendly trade assurance workflow interface." 
                  badge="Client Side"
                  className="premium-3d-card"
                />
                <Card 
                  icon={<Cpu className="w-6 h-6" />}
                  title="AI & Application Layer" 
                  description="AI assists document parsing, verification checks, document drafting, and anomaly detection." 
                  badge="Analytics"
                  className="premium-3d-card"
                />
                <Card 
                  icon={<Lock className="w-6 h-6" />}
                  title="Settlement Layer" 
                  description="Escrow logic safely manages locked transaction value and monitors designated release conditions." 
                  badge="Core Logic"
                  className="premium-3d-card"
                />
                <Card 
                  icon={<Layers className="w-6 h-6" />}
                  title="Blockchain Layer" 
                  description="Records cryptographic proof hashes, transaction statuses, and tamper-resistant audit trail logs." 
                  badge="Audit Rail"
                  className="premium-3d-card"
                />
                <Card 
                  icon={<FileCheck className="w-6 h-6" />}
                  title="Storage & Compliance Layer" 
                  description="Signed documents, certificates, and invoices are securely stored in encrypted private cloud repositories." 
                  badge="Secure Cloud"
                  className="premium-3d-card"
                />
              </div>
            </div>
          </section>

          {/* Section 6: Ecosystem Section */}
          <section id="ecosystem" className="py-32 border-t border-slate-200/40 dark:border-white/5 scroll-mt-20">
            <div className="mx-auto max-w-7xl px-6 md:px-10">
              <SectionHeader 
                badge="Ecosystem Alignment" 
                title="Designed to align with the trade ecosystem." 
                description="We formulate compatibility routes that build upon domestic frameworks and international trade standards without claiming exclusive sponsorships."
              />
              <div className="relative overflow-hidden rounded-2xl border border-slate-200/60 bg-white/65 p-6 shadow-sm backdrop-blur-sm dark:border-white/[0.06] dark:bg-[#070e1a]/45 md:p-8">
                <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(37,99,235,0.08),transparent_58%)] dark:bg-[radial-gradient(circle_at_50%_50%,rgba(6,182,212,0.12),transparent_60%)]" />

                <div className="relative mx-auto hidden h-[620px] justify-center lg:flex">
                  <div className="relative h-full w-full max-w-[760px]">
                    <div className="pointer-events-none absolute left-1/2 top-1/2 h-[560px] w-[560px] -translate-x-1/2 -translate-y-1/2 rounded-full border border-slate-300/50 dark:border-cyan-400/10" />
                    <div className="pointer-events-none absolute left-1/2 top-1/2 h-[420px] w-[420px] -translate-x-1/2 -translate-y-1/2 rounded-full border border-slate-300/50 dark:border-cyan-400/10" />
                    <div className="pointer-events-none absolute left-1/2 top-1/2 h-[280px] w-[280px] -translate-x-1/2 -translate-y-1/2 rounded-full border border-slate-300/50 dark:border-cyan-400/10" />
                    <div className="radar-sweep pointer-events-none absolute left-1/2 top-1/2 h-[560px] w-[560px] -translate-x-1/2 -translate-y-1/2 rounded-full opacity-60" />

                    <div className="pointer-events-none absolute left-1/2 top-1/2 h-px w-[78%] -translate-x-1/2 bg-gradient-to-r from-transparent via-slate-300 to-transparent dark:via-cyan-400/20" />
                    <div className="pointer-events-none absolute left-1/2 top-1/2 h-[78%] w-px -translate-y-1/2 bg-gradient-to-b from-transparent via-slate-300 to-transparent dark:via-cyan-400/20" />

                    <div className="absolute left-1/2 top-1/2 z-20 flex h-36 w-36 -translate-x-1/2 -translate-y-1/2 flex-col items-center justify-center rounded-full border border-blue-500/30 bg-white/90 text-center shadow-[0_0_40px_rgba(37,99,235,0.12)] dark:border-cyan-400/30 dark:bg-slate-950/90 dark:shadow-[0_0_45px_rgba(34,211,238,0.18)]">
                      <span className="text-[10px] font-extrabold uppercase tracking-widest text-blue-600 dark:text-cyan-400">Center Node</span>
                      <span className="mt-1 text-lg font-extrabold tracking-tight text-slate-950 dark:text-white">NEXII PORT</span>
                    </div>

                    {ecosystemNodes.map((node, index) => {
                      const angle = (index / ecosystemNodes.length) * Math.PI * 2 - Math.PI / 2;
                      const left = 50 + Math.cos(angle) * 38;
                      const top = 50 + Math.sin(angle) * 38;

                      return (
                        <div
                          key={node.title}
                          className="group absolute z-30 w-48 -translate-x-1/2 -translate-y-1/2"
                          style={{ left: `${left}%`, top: `${top}%` }}
                        >
                          <div className="relative rounded-xl border border-slate-200/80 bg-white/90 p-4 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-blue-500/50 hover:shadow-[0_16px_40px_rgba(37,99,235,0.10)] dark:border-white/10 dark:bg-slate-950/85 dark:hover:border-cyan-400/50 dark:hover:shadow-[0_16px_44px_rgba(34,211,238,0.12)]">
                            <span className={`mb-3 inline-flex rounded-full px-2 py-0.5 text-[9px] font-extrabold uppercase tracking-widest ${
                              node.type === 'Domestic'
                                ? 'bg-blue-500/10 text-blue-600 dark:text-blue-300'
                                : 'bg-cyan-500/10 text-cyan-600 dark:text-cyan-300'
                            }`}>
                              {node.type}
                            </span>
                            <h3 className="text-sm font-bold leading-snug text-slate-900 transition-colors duration-300 group-hover:text-blue-600 dark:text-white dark:group-hover:text-cyan-300">
                              {node.title}
                            </h3>
                            <p className="mt-2 max-h-0 overflow-hidden text-xs leading-relaxed text-slate-500 opacity-0 transition-all duration-300 group-hover:max-h-24 group-hover:opacity-100 dark:text-slate-400">
                              {node.desc}
                            </p>
                            <span className="absolute -left-1 top-1/2 h-2 w-2 -translate-y-1/2 rounded-full bg-blue-500 shadow-[0_0_12px_rgba(37,99,235,0.55)] dark:bg-cyan-400 dark:shadow-[0_0_12px_rgba(34,211,238,0.65)]" />
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>

                <div className="relative grid grid-cols-1 gap-4 lg:hidden">
                  {ecosystemNodes.map((node) => (
                    <div key={node.title} className="rounded-xl border border-slate-200/70 bg-slate-50/70 p-5 dark:border-white/10 dark:bg-white/[0.03]">
                      <div className="mb-3 flex items-center justify-between gap-3">
                        <h3 className="text-sm font-bold text-slate-900 dark:text-white">{node.title}</h3>
                        <span className="shrink-0 rounded-full bg-blue-500/10 px-2 py-0.5 text-[9px] font-extrabold uppercase tracking-widest text-blue-600 dark:bg-cyan-500/10 dark:text-cyan-300">
                          {node.type}
                        </span>
                      </div>
                      <p className="text-xs leading-relaxed text-slate-500 dark:text-slate-400">{node.desc}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </section>

          {/* Section 7: Demo Section */}
          <section id="demo" className="py-32 border-t border-slate-200/40 dark:border-white/5 scroll-mt-20">
            <div className="mx-auto max-w-7xl px-6 md:px-10">
              <SectionHeader 
                badge="Visual Platform" 
                title="Mini Transaction Demo" 
                description="Review our real-time audit records showing transaction details locked securely in the NEXII PORT digital ledger."
              />
              
              {/* Spacious, premium mock browser console frame */}
              <div className="w-full bg-white/70 dark:bg-[#070e1a]/60 border border-slate-200/60 dark:border-white/[0.06] rounded-2xl flex flex-col overflow-hidden backdrop-blur-sm shadow-md transition-colors duration-300">
                {/* Simulated Header */}
                <div className="h-14 border-b border-slate-200/60 dark:border-white/[0.06] px-6 flex items-center justify-between bg-slate-50/50 dark:bg-white/[0.01]">
                  <div className="flex gap-2.5">
                    <span className="w-3 h-3 rounded-full bg-red-400/90" />
                    <span className="w-3 h-3 rounded-full bg-yellow-400/90" />
                    <span className="w-3 h-3 rounded-full bg-green-400/90" />
                  </div>
                  <span className="text-xs font-mono font-medium text-slate-400 dark:text-slate-500">transaction_monitor.tsx</span>
                  <div className="w-16" />
                </div>
                {/* Demo Fields Grid */}
                <div className="p-8 md:p-10">
                  <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-5 mb-8">
                    <div>
                      <p className="text-xs font-bold uppercase tracking-widest text-slate-400 dark:text-slate-500 mb-2">
                        Transaction Flow
                      </p>
                      <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed max-w-2xl">
                        Try the escrow release flow and watch verification, shipment, audit, and settlement states update together.
                      </p>
                    </div>
                    <button
                      onClick={startSimulation}
                      disabled={isSimulating}
                      className="w-full sm:w-auto px-6 py-3.5 bg-gradient-to-r from-blue-600 to-cyan-500 hover:from-blue-500 hover:to-cyan-400 disabled:from-slate-500 disabled:to-slate-600 text-white font-semibold rounded-xl transition-transform duration-300 shadow-md shadow-blue-500/10 hover:shadow-cyan-500/20 flex items-center justify-center gap-2 cursor-pointer disabled:cursor-not-allowed hover:-translate-y-0.5 disabled:hover:translate-y-0"
                    >
                      <Play className="w-4 h-4" />
                      {isSimulating ? 'Simulation Running...' : currentStep === demoSteps.length ? 'Run Again' : 'Simulate Transaction'}
                    </button>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 md:gap-8">
                    {[
                      { label: 'Transaction ID', val: 'NX-TRD-2048', mono: true },
                      { label: 'Seller', val: 'Indonesian SME Exporter' },
                      { label: 'Buyer', val: 'International Buyer' },
                      { label: 'Escrow State', val: statuses.escrow, status: true },
                      { label: 'AI Verification', val: statuses.ai, status: true },
                      { label: 'Document Hash', val: statuses.hash, status: true },
                      { label: 'Shipment Status', val: statuses.shipment, status: true },
                      { label: 'Dispute Status', val: statuses.dispute, status: true },
                      { label: 'Settlement', val: statuses.settlement, status: true },
                    ].map((item) => (
                      <div key={item.label} className="p-6 bg-slate-50/60 dark:bg-[#030712]/30 rounded-xl border border-slate-200/50 dark:border-white/[0.03] backdrop-blur-sm hover:border-blue-500/10 dark:hover:border-cyan-500/10 transition-colors duration-300">
                        <span className="text-xs font-semibold text-slate-400 dark:text-slate-500 block mb-2">{item.label}</span>
                        {item.status ? (
                          <div className="flex items-center gap-2 mt-1">
                            <span className={`w-2.5 h-2.5 rounded-full shadow-[0_0_8px_currentColor] ${statusTone(item.val).split(' ')[0]}`} />
                            <span className={`text-xs font-bold uppercase tracking-wider ${statusTone(item.val).split(' ').slice(1).join(' ')}`}>
                              {item.val}
                            </span>
                          </div>
                        ) : (
                          <span className={`text-sm font-bold text-slate-900 dark:text-white leading-tight ${item.mono ? 'font-mono tracking-tight text-xs' : ''}`}>
                            {item.val}
                          </span>
                        )}
                      </div>
                    ))}
                  </div>

                  <div className="mt-10 p-6 bg-slate-50/60 dark:bg-[#030712]/30 rounded-xl border border-slate-200/50 dark:border-white/[0.03] overflow-x-auto">
                    <div className="mb-8 h-2 rounded-full bg-slate-200/70 dark:bg-white/10 overflow-hidden">
                      <div
                        className="h-full rounded-full bg-gradient-to-r from-blue-600 to-cyan-400 transition-[width] duration-500"
                        style={{ width: `${progressPercent}%` }}
                      />
                    </div>

                    <div className="min-w-[780px] lg:min-w-0 grid grid-cols-7 gap-3">
                      {demoSteps.map((step, idx) => {
                        const stepNumber = idx + 1;
                        const isCompleted = stepNumber < currentStep;
                        const isCurrent = stepNumber === currentStep;
                        const stepState = isCompleted ? 'Completed' : isCurrent ? 'Active' : 'Pending';

                        return (
                          <div key={step.title} className="relative">
                            {idx < demoSteps.length - 1 && (
                              <div className={`absolute top-5 left-1/2 right-[-50%] h-0.5 ${isCompleted ? 'bg-blue-500 dark:bg-cyan-400' : 'bg-slate-200 dark:bg-white/10'}`} />
                            )}
                            <div className="relative z-10 flex flex-col items-center text-center">
                              <span className={`w-10 h-10 rounded-xl flex items-center justify-center border text-xs font-extrabold transition-colors duration-300 ${
                                isCompleted
                                  ? 'bg-emerald-500 text-white border-emerald-500'
                                  : isCurrent
                                    ? 'bg-blue-500 text-white border-blue-500 dark:bg-cyan-500 dark:border-cyan-500 shadow-[0_0_24px_rgba(59,130,246,0.35)] animate-pulse'
                                    : 'bg-white text-slate-400 border-slate-200 dark:bg-slate-900 dark:text-slate-500 dark:border-white/10'
                              }`}>
                                {isCompleted ? <CheckCircle className="w-4 h-4" /> : stepNumber}
                              </span>
                              <span className={`mt-3 text-[11px] font-bold leading-snug ${isCompleted || isCurrent ? 'text-slate-900 dark:text-white' : 'text-slate-400 dark:text-slate-500'}`}>
                                {step.title}
                              </span>
                              <span className={`mt-2 text-[9px] font-extrabold uppercase tracking-widest ${
                                isCompleted
                                  ? 'text-emerald-500'
                                  : isCurrent
                                    ? 'text-blue-600 dark:text-cyan-400'
                                    : 'text-slate-400 dark:text-slate-600'
                              }`}>
                                {stepState}
                              </span>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>

                  <div className="mt-6 p-6 bg-slate-50/60 dark:bg-[#030712]/30 rounded-xl border border-slate-200/50 dark:border-white/[0.03]">
                    <div className="flex items-center justify-between gap-4 mb-4">
                      <h3 className="text-sm font-bold uppercase tracking-widest text-slate-500 dark:text-slate-400">
                        Current Process
                      </h3>
                      <span className="text-xs font-mono text-blue-600 dark:text-cyan-400">
                        Step {currentStep}/7
                      </span>
                    </div>
                    <div className="space-y-3">
                      {activityLog.length === 0 ? (
                        <p className="text-sm text-slate-500 dark:text-slate-400">
                          Waiting for simulation to begin.
                        </p>
                      ) : (
                        activityLog.map((entry, idx) => {
                          const isLatest = idx === activityLog.length - 1;

                          return (
                            <div
                              key={`${idx}-${entry}`}
                              className={`flex items-start gap-3 rounded-lg border p-3 transition-colors duration-300 ${
                                isLatest
                                  ? 'border-blue-500/30 bg-blue-500/10 dark:border-cyan-500/30 dark:bg-cyan-500/10'
                                  : 'border-slate-200/50 bg-white/50 dark:border-white/[0.04] dark:bg-white/[0.02]'
                              }`}
                            >
                              <span className={`mt-1 h-2 w-2 shrink-0 rounded-full ${isLatest ? 'bg-blue-500 dark:bg-cyan-400' : 'bg-emerald-500'}`} />
                              <p className={`text-sm leading-relaxed ${isLatest ? 'text-slate-900 dark:text-white' : 'text-slate-600 dark:text-slate-400'}`}>
                                {entry}
                              </p>
                            </div>
                          );
                        })
                      )}
                    </div>
                  </div>
                </div>
              </div>

            </div>
          </section>

          {/* Section 8: Roadmap Section */}
          <section id="roadmap" className="py-32 border-t border-slate-200/40 dark:border-white/5 scroll-mt-20">
            <div className="mx-auto max-w-7xl px-6 md:px-10">
              <SectionHeader 
                badge="The Horizon" 
                title="From MVP to Future Trade Infrastructure" 
                description="Our strategic path outlines the release schedule, advancing programmable escrows toward comprehensive international trade integrations."
              />
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6 md:gap-8">
                {[
                  { phase: "Phase 1", title: "MVP Trade Escrows", desc: "Initial testing of secure on-chain trade escrows and instant bank API hooks.", badge: "Completed" },
                  { phase: "Phase 2", title: "AI Audit Engine", desc: "Releasing machine learning workflows that ingest bills of lading and customs documentation automatically.", badge: "In Progress" },
                  { phase: "Phase 3", title: "Ecosystem Pilot", desc: "Blockchain audit trail and regulatory sandbox trials for SME trade assurance.", badge: "Q3 2026" },
                  { phase: "Phase 4", title: "Programmable Clearing", desc: "CBDC-ready settlement systems and multi-currency legal tender pools.", badge: "Q1 2027" },
                  { phase: "Phase 5", title: "Global Settlement", desc: "Cross-border sovereign infrastructure expansions and trade node integrations.", badge: "Q3 2027" }
                ].map((item, idx) => (
                  <div key={idx} className="group relative p-6 bg-white/60 dark:bg-[#070e1a]/40 border border-slate-200/60 dark:border-white/[0.06] hover:border-blue-500/40 dark:hover:border-cyan-500/40 hover:shadow-[0_8px_30px_rgba(0,0,0,0.03)] dark:hover:shadow-[0_8px_30px_rgba(6,182,212,0.08)] rounded-2xl backdrop-blur-sm transition-all duration-300 overflow-hidden flex flex-col justify-between min-h-[220px]">
                    <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none bg-gradient-to-tr from-blue-500/5 to-cyan-500/5 dark:from-blue-500/10 dark:to-cyan-500/10" />
                    <div className="relative z-10 flex flex-col h-full justify-between">
                      <div>
                        <div className="flex items-center justify-between mb-4">
                          <span className="text-xs font-extrabold text-blue-600 dark:text-cyan-400 uppercase tracking-widest">{item.phase}</span>
                          <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                            item.badge === "Completed" ? "bg-emerald-500/10 text-emerald-500" :
                            item.badge === "In Progress" ? "bg-amber-500/10 text-amber-600" :
                            "bg-blue-500/10 text-blue-500 dark:text-cyan-400"
                          }`}>{item.badge}</span>
                        </div>
                        <h4 className="font-bold text-slate-900 dark:text-white mb-2 leading-snug group-hover:text-blue-600 dark:group-hover:text-cyan-400 transition-colors">
                          {item.title}
                        </h4>
                      </div>
                      <p className="text-[11px] text-slate-500 dark:text-slate-400 leading-relaxed mt-2">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* Section 9: Footer */}
          <footer className="py-16 md:py-24 border-t border-slate-200/55 dark:border-white/5 bg-slate-50/50 dark:bg-[#030712]/50 transition-colors duration-300">
            <div className="mx-auto max-w-7xl px-6 md:px-10">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 mb-16">
                
                {/* Brand Info */}
                <div className="lg:col-span-2">
                  <h3 className="font-heading font-extrabold text-xl text-slate-900 dark:text-white tracking-tight mb-3">
                    NEXII PORT
                  </h3>
                  <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed mb-1.5 uppercase font-bold tracking-wider">
                    Nusantara Export and Import Infrastructure
                  </p>
                  <p className="text-sm text-slate-500 dark:text-slate-400 leading-relaxed max-w-sm">
                    Reinventing Trade Trust. Digital Trade Assurance & Programmable Settlement.
                  </p>
                </div>

                <div>
                  <h4 className="text-sm font-bold text-slate-900 dark:text-white uppercase tracking-wider mb-4 transition-colors duration-300">
                    Platform
                  </h4>
                  <ul className="space-y-2.5">
                    <li><a href="#hero" className="text-sm text-slate-600 dark:text-slate-400 hover:text-blue-500 transition-colors">Overview</a></li>
                    <li><a href="#flow" className="text-sm text-slate-600 dark:text-slate-400 hover:text-blue-500 transition-colors">Process Flow</a></li>
                    <li><a href="#demo" className="text-sm text-slate-600 dark:text-slate-400 hover:text-blue-500 transition-colors">Interactive Demo</a></li>
                  </ul>
                </div>
                <div>
                  <h4 className="text-sm font-bold text-slate-900 dark:text-white uppercase tracking-wider mb-4 transition-colors duration-300">
                    Resources
                  </h4>
                  <ul className="space-y-2.5">
                    <li><a href="#problem" className="text-sm text-slate-600 dark:text-slate-400 hover:text-blue-500 transition-colors">Trade Barriers</a></li>
                    <li><a href="#infrastructure" className="text-sm text-slate-600 dark:text-slate-400 hover:text-blue-500 transition-colors">Architecture</a></li>
                    <li><a href="#ecosystem" className="text-sm text-slate-600 dark:text-slate-400 hover:text-blue-500 transition-colors">Ecosystem API</a></li>
                  </ul>
                </div>
                <div>
                  <h4 className="text-sm font-bold text-slate-900 dark:text-white uppercase tracking-wider mb-4 transition-colors duration-300">
                    Company
                  </h4>
                  <ul className="space-y-2.5">
                    <li><a href="#" className="text-sm text-slate-600 dark:text-slate-400 hover:text-blue-500 transition-colors">Documentation</a></li>
                    <li><a href="#" className="text-sm text-slate-600 dark:text-slate-400 hover:text-blue-500 transition-colors">Whitepaper</a></li>
                    <li><a href="#" className="text-sm text-slate-600 dark:text-slate-400 hover:text-blue-500 transition-colors">Security Audit</a></li>
                  </ul>
                </div>
              </div>

              {/* Legal Warning Notice */}
              <div className="p-6 bg-slate-100/60 dark:bg-white/[0.02] border border-slate-200/50 dark:border-slate-800/40 rounded-xl mb-12">
                <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
                  <span className="font-bold text-slate-700 dark:text-slate-300 block mb-1">Legal Note:</span>
                  NEXII PORT is a conceptual digital trade assurance infrastructure. It does not operate as a bank, public cryptocurrency exchange, payment institution, or legal arbitrator. Tokenized escrow state refers to a non-tradable digital representation of transaction status and locked value within the platform workflow. Future CBDC compatibility is presented as a roadmap alignment.
                </p>
              </div>

              <div className="flex flex-col md:flex-row justify-between items-center pt-8 border-t border-slate-200/50 dark:border-white/5 text-xs text-slate-500">
                <span className="mb-4 md:mb-0 transition-colors duration-300">© 2026 NEXII PORT. All rights reserved.</span>
                <div className="flex gap-6">
                  <a href="#" className="hover:text-blue-500 transition-colors">Twitter</a>
                  <a href="#" className="hover:text-blue-500 transition-colors">LinkedIn</a>
                  <a href="#" className="hover:text-blue-500 transition-colors">GitHub</a>
                </div>
              </div>
            </div>
          </footer>

        </main>
      </div>
    </div>
  );
}
