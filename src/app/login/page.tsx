'use client';

import { useState } from 'react';
import Link from 'next/link';
import {
  ArrowLeft,
  ArrowRight,
  BriefcaseBusiness,
  CheckCircle2,
  ChevronRight,
  Eye,
  EyeOff,
  FileSearch,
  Globe2,
  Moon,
  PackageCheck,
  ShieldCheck,
  Sparkles,
  Sun,
  Users,
} from 'lucide-react';
import { useTheme } from '@/lib/theme-provider';

const features = [
  {
    title: 'Export Pool',
    description: 'Find active export opportunities and manage export cases.',
    icon: BriefcaseBusiness,
  },
  {
    title: 'Buyer Matching',
    description: 'See recommended buyers based on product, country, volume, and trust signals.',
    icon: Users,
  },
  {
    title: 'AI Document Review',
    description: 'Check invoices, packing lists, HS codes, and export requirements before submission.',
    icon: FileSearch,
  },
  {
    title: 'Export Tracking',
    description: 'Monitor every step from buyer confirmation to shipment progress.',
    icon: PackageCheck,
  },
  {
    title: 'Settlement Readiness',
    description: 'Get a partner-ready recommendation based on verified trade evidence.',
    icon: ShieldCheck,
  },
];

const flow = ['Login', 'Export Pool', 'Match Buyer', 'Review Docs', 'Track Shipment', 'Settlement Readiness'];

export default function LoginPage() {
  const [showPassword, setShowPassword] = useState(false);
  const { theme, toggleTheme, mounted } = useTheme();

  return (
    <main className="min-h-screen overflow-x-hidden bg-slate-50 text-slate-950 transition-colors dark:bg-[#030712] dark:text-white">
      <header className="border-b border-slate-200/70 bg-white/80 backdrop-blur-xl dark:border-white/10 dark:bg-[#030712]/85">
        <div className="mx-auto flex h-16 max-w-[1500px] items-center justify-between px-4 sm:px-6 lg:px-8">
          <Link href="/" className="flex min-w-0 items-center gap-3">
            <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-blue-600 to-cyan-500 text-sm font-black text-white shadow-lg shadow-blue-500/20">
              N
            </span>
            <span className="min-w-0">
              <span className="block truncate font-heading text-sm font-extrabold tracking-tight">NEXII PORT</span>
              <span className="block truncate text-[9px] font-bold uppercase tracking-wider text-slate-400">Export Trust Workspace</span>
            </span>
          </Link>

          <div className="flex items-center gap-1">
            <button
              type="button"
              onClick={toggleTheme}
              className="flex h-10 w-10 items-center justify-center rounded-xl text-slate-500 transition hover:bg-slate-100 dark:text-slate-300 dark:hover:bg-white/10"
              aria-label="Toggle theme"
            >
              {mounted ? theme === 'dark' ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" /> : <span className="h-4 w-4" />}
            </button>
            <Link
              href="/"
              className="flex min-h-10 items-center gap-2 rounded-xl border border-slate-200 bg-white px-3 text-xs font-bold text-slate-600 transition hover:border-blue-500/30 hover:text-blue-600 dark:border-white/10 dark:bg-white/[0.04] dark:text-slate-300"
            >
              <ArrowLeft className="h-3.5 w-3.5" />
              <span className="hidden sm:inline">Back to Home</span>
              <span className="sm:hidden">Home</span>
            </Link>
          </div>
        </div>
      </header>

      <div className="relative">
        <div className="pointer-events-none absolute inset-0 grid-pattern opacity-[0.15] dark:opacity-20" />
        <div className="pointer-events-none absolute left-0 top-0 h-[420px] w-[420px] rounded-full bg-blue-500/[0.08] blur-[110px]" />
        <div className="pointer-events-none absolute right-0 top-32 h-[380px] w-[380px] rounded-full bg-cyan-500/[0.08] blur-[120px]" />

        <div className="relative mx-auto grid w-full max-w-[1500px] gap-8 px-4 py-8 sm:px-6 sm:py-10 lg:grid-cols-[minmax(0,1fr)_420px] lg:gap-10 lg:px-8 lg:py-14 xl:gap-14">
          <section className="min-w-0">
            <div className="max-w-4xl">
              <span className="inline-flex items-center gap-2 rounded-full border border-blue-500/20 bg-blue-500/[0.08] px-3 py-1.5 text-[11px] font-bold uppercase tracking-wider text-blue-600 dark:border-cyan-400/20 dark:text-cyan-300">
                <Sparkles className="h-3.5 w-3.5" />
                Prototype Mode
              </span>
              <h1 className="mt-6 max-w-3xl font-heading text-4xl font-extrabold leading-[1.08] tracking-tight sm:text-5xl xl:text-6xl">
                Access your{' '}
                <span className="bg-gradient-to-r from-blue-600 to-cyan-500 bg-clip-text text-transparent dark:from-blue-400 dark:to-cyan-300">
                  Export Trust Workspace
                </span>
              </h1>
              <p className="mt-5 max-w-3xl text-sm leading-relaxed text-slate-600 dark:text-slate-300 sm:text-base">
                Manage buyer matches, AI-checked documents, export progress, and settlement readiness from one trusted workspace.
              </p>
            </div>

            <section className="mt-8">
              <div className="mb-4 flex items-center justify-between gap-4">
                <div>
                  <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-blue-600 dark:text-cyan-400">Inside the workspace</p>
                  <h2 className="mt-1 font-heading text-xl font-extrabold">Built around exporter decisions</h2>
                </div>
                <span className="hidden rounded-full bg-emerald-500/10 px-3 py-1.5 text-[10px] font-bold text-emerald-600 dark:text-emerald-300 sm:inline-flex">
                  Mock data preview
                </span>
              </div>

              <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-3">
                {features.map((feature, index) => {
                  const Icon = feature.icon;
                  return (
                    <article
                      key={feature.title}
                      className={`rounded-2xl border border-slate-200/75 bg-white/85 p-4 shadow-sm backdrop-blur-xl transition hover:-translate-y-0.5 hover:border-blue-500/25 hover:shadow-lg hover:shadow-blue-500/5 dark:border-white/10 dark:bg-white/[0.035] ${
                        index === features.length - 1 ? 'sm:col-span-2 xl:col-span-1' : ''
                      }`}
                    >
                      <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-blue-500/15 to-cyan-500/10 text-blue-600 dark:text-cyan-300">
                        <Icon className="h-4.5 w-4.5" />
                      </div>
                      <h3 className="mt-4 text-sm font-extrabold">{feature.title}</h3>
                      <p className="mt-1.5 text-[11px] leading-relaxed text-slate-500 dark:text-slate-400">{feature.description}</p>
                    </article>
                  );
                })}
              </div>
            </section>

            <section className="mt-6 rounded-2xl border border-slate-200/75 bg-white/80 p-4 shadow-sm backdrop-blur-xl dark:border-white/10 dark:bg-white/[0.03] sm:p-5">
              <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-blue-600 dark:text-cyan-400">Workspace flow preview</p>
              <div className="mt-4 flex flex-wrap items-center gap-2">
                {flow.map((step, index) => (
                  <div key={step} className="flex items-center gap-2">
                    <span className={`inline-flex min-h-9 items-center rounded-xl border px-3 text-[10px] font-bold ${
                      index === 0
                        ? 'border-blue-500/20 bg-blue-600 text-white shadow-md shadow-blue-500/15'
                        : 'border-slate-200 bg-slate-50 text-slate-600 dark:border-white/10 dark:bg-white/[0.04] dark:text-slate-300'
                    }`}>
                      {step}
                    </span>
                    {index < flow.length - 1 && <ChevronRight className="h-3.5 w-3.5 text-slate-300 dark:text-slate-600" />}
                  </div>
                ))}
              </div>
            </section>

            <section className="mt-6 overflow-hidden rounded-2xl border border-cyan-500/20 bg-gradient-to-br from-blue-600 to-cyan-500 p-[1px] shadow-lg shadow-blue-500/10">
              <div className="rounded-[15px] bg-white/95 p-5 dark:bg-[#07101f]/95 sm:p-6">
                <div className="flex flex-col justify-between gap-5 sm:flex-row sm:items-start">
                  <div className="min-w-0">
                    <div className="flex flex-wrap items-center gap-2">
                      <span className="rounded-full bg-cyan-500/10 px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider text-cyan-700 dark:text-cyan-300">Active demo case</span>
                      <span className="text-[10px] font-bold text-slate-400">NX-25031</span>
                    </div>
                    <h2 className="mt-3 font-heading text-lg font-extrabold sm:text-xl">Coconut Sugar Export to Japan</h2>
                    <p className="mt-1 text-xs font-semibold text-blue-600 dark:text-cyan-300">AI document review in progress</p>
                    <div className="mt-4 flex gap-3 rounded-xl bg-amber-500/[0.08] p-3">
                      <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-amber-500" />
                      <div>
                        <p className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Next action</p>
                        <p className="mt-1 text-xs font-semibold">Confirm HS code before buyer submission</p>
                      </div>
                    </div>
                  </div>
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-blue-600 to-cyan-500 text-white shadow-lg shadow-blue-500/20">
                    <Globe2 className="h-5 w-5" />
                  </div>
                </div>
              </div>
            </section>
          </section>

          <aside className="order-first min-w-0 lg:order-none lg:sticky lg:top-8 lg:self-start">
            <div className="rounded-2xl border border-slate-200/80 bg-white/95 p-5 shadow-2xl shadow-slate-900/[0.08] backdrop-blur-xl dark:border-white/10 dark:bg-[#07101f]/95 dark:shadow-black/30 sm:p-7">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <span className="inline-flex items-center gap-2 rounded-full bg-blue-500/10 px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider text-blue-600 dark:text-cyan-300">
                    <ShieldCheck className="h-3.5 w-3.5" />
                    Exporter Demo
                  </span>
                  <h2 className="mt-4 font-heading text-2xl font-extrabold tracking-tight">Enter the workspace</h2>
                  <p className="mt-2 text-xs leading-relaxed text-slate-500 dark:text-slate-400">Use the prepared demo credentials below.</p>
                </div>
                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-blue-600 to-cyan-500 text-white shadow-lg shadow-blue-500/20">
                  <BriefcaseBusiness className="h-5 w-5" />
                </div>
              </div>

              <div className="mt-7 space-y-5">
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-200">
                  Email
                  <input
                    defaultValue="exporter@nexiiport.demo"
                    type="email"
                    className="mt-2 h-12 w-full rounded-xl border border-slate-200 bg-slate-50 px-4 text-sm text-slate-900 outline-none transition focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 dark:border-white/10 dark:bg-white/[0.04] dark:text-white"
                  />
                </label>

                <label className="block text-xs font-bold text-slate-700 dark:text-slate-200">
                  Password
                  <span className="relative mt-2 block">
                    <input
                      defaultValue="nexii-demo"
                      type={showPassword ? 'text' : 'password'}
                      className="h-12 w-full rounded-xl border border-slate-200 bg-slate-50 px-4 pr-12 text-sm text-slate-900 outline-none transition focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 dark:border-white/10 dark:bg-white/[0.04] dark:text-white"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword((value) => !value)}
                      className="absolute right-2 top-1/2 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-xl text-slate-400 transition hover:bg-slate-100 hover:text-slate-700 dark:hover:bg-white/10 dark:hover:text-white"
                      aria-label={showPassword ? 'Hide password' : 'Show password'}
                    >
                      {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                    </button>
                  </span>
                </label>
              </div>

              <Link
                href="/app"
                className="mt-6 flex min-h-12 w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-blue-600 to-cyan-500 px-4 text-sm font-bold text-white shadow-lg shadow-blue-500/20 transition hover:-translate-y-0.5 hover:shadow-cyan-500/25"
              >
                Enter Demo Workspace
                <ArrowRight className="h-4 w-4" />
              </Link>

              <Link
                href="/"
                className="mt-3 flex min-h-11 w-full items-center justify-center gap-2 rounded-xl border border-slate-200 bg-white px-4 text-xs font-bold text-slate-600 transition hover:border-blue-500/30 hover:text-blue-600 dark:border-white/10 dark:bg-white/[0.03] dark:text-slate-300"
              >
                <ArrowLeft className="h-3.5 w-3.5" />
                Back to Home
              </Link>

              <div className="mt-5 flex gap-3 rounded-xl border border-blue-500/10 bg-blue-500/[0.05] p-3">
                <Sparkles className="mt-0.5 h-4 w-4 shrink-0 text-blue-600 dark:text-cyan-300" />
                <p className="text-[10px] leading-relaxed text-slate-500 dark:text-slate-400">
                  <span className="font-bold text-slate-700 dark:text-slate-200">Prototype mode</span> — no real authentication required.
                </p>
              </div>
            </div>
          </aside>
        </div>
      </div>
    </main>
  );
}
