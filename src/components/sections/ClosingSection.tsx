'use client';

import { useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Eye, Mail, Send, X, ShieldAlert } from 'lucide-react';
import GlowOrb from '@/components/effects/GlowOrb';
import { GlowButton } from '@/components/ui/GlowButton';

export default function ClosingSection() {
  const ref = useRef<HTMLDivElement>(null);
  const [showContact, setShowContact] = useState(false);
  const [email, setEmail] = useState('');
  const [sent, setSent] = useState(false);

  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleContactSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    setSent(true);
    setTimeout(() => {
      setSent(false);
      setEmail('');
      setShowContact(false);
    }, 2500);
  };

  return (
    <div
      className="relative w-full overflow-visible min-h-[60vh] flex items-center bg-slate-950 text-white mt-20"
    >
      {/* Background grids */}
      <div className="absolute inset-0 grid-pattern opacity-5 pointer-events-none -z-10" />

      {/* Ambient glow effects */}
      <GlowOrb color="blue" size="lg" className="top-1/4 -left-40 opacity-40 -z-10 pointer-events-none" />
      <GlowOrb color="cyan" size="md" className="bottom-1/4 -right-32 opacity-40 -z-10 pointer-events-none" />
      <GlowOrb color="violet" size="sm" className="top-1/2 left-1/2 -translate-x-1/2 opacity-30 -z-10 pointer-events-none" />

      <div ref={ref} className="max-w-7xl mx-auto w-full relative z-10">
        <div className="flex flex-col items-center text-center max-w-4xl mx-auto">
          {/* Pre-title indicator */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex mb-6"
          >
            <span className="inline-flex items-center gap-2 px-4 py-1 rounded-full text-[10px] font-mono font-bold tracking-widest border border-blue-500/20 bg-blue-500/10 text-blue-400">
              FUTURE READINESS
            </span>
          </motion.div>

          {/* Headline */}
          <motion.h2
            className="font-heading text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-extrabold text-slate-50 mb-6 leading-tight"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            Build the{' '}
            <span className="bg-gradient-to-r from-blue-500 via-cyan-400 to-blue-600 bg-clip-text text-transparent">
              trust layer
            </span>{' '}
            for future trade.
          </motion.h2>

          {/* Subheadline */}
          <motion.p
            className="text-sm sm:text-base md:text-lg text-slate-400 text-center max-w-2xl mx-auto mb-12 leading-relaxed"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.15 }}
          >
            NEXII PORT brings AI verification, tokenized escrow state, and blockchain transparency into one programmable infrastructure for global SME trade.
          </motion.p>

          {/* Action buttons */}
          <motion.div
            className="flex flex-col sm:flex-row gap-4"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            <GlowButton variant="primary" onClick={() => scrollTo('demo')}>
              <Eye className="w-4 h-4 mr-2" />
              Explore Demo
            </GlowButton>
            <GlowButton variant="secondary" onClick={() => setShowContact(true)}>
              <Mail className="w-4 h-4 mr-2" />
              Contact NEXII PORT
            </GlowButton>
          </motion.div>
        </div>
      </div>

      {/* Interactive Contact Overlay Modal */}
      <AnimatePresence>
        {showContact && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-6"
          >
            <motion.div
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
              className="w-full max-w-md bg-slate-900 border border-white/10 rounded-2xl p-6 relative overflow-hidden shadow-2xl"
            >
              <button
                onClick={() => setShowContact(false)}
                className="absolute top-4 right-4 text-slate-500 hover:text-white transition-colors cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="mb-6 flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-blue-500/10 flex items-center justify-center text-blue-400">
                  <Mail className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-heading font-bold text-lg text-white">Contact NEXII</h3>
                  <span className="text-[10px] font-mono text-slate-500 uppercase tracking-widest">Trade Infrastructure Inquiry</span>
                </div>
              </div>

              {sent ? (
                <div className="text-center py-8 space-y-4">
                  <div className="w-12 h-12 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 flex items-center justify-center mx-auto shadow-[0_0_15px_rgba(16,185,129,0.2)]">
                    <Send className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-white uppercase font-mono tracking-wider">Inquiry Sent</h4>
                    <p className="text-xs text-slate-400 mt-1">Our infrastructure coordination team will contact you shortly.</p>
                  </div>
                </div>
              ) : (
                <form onSubmit={handleContactSubmit} className="space-y-4">
                  <p className="text-xs text-slate-400 leading-relaxed">
                    Submit your organization email below. We coordinate pilots for SME exporter communities, trade associations, and logistics networks.
                  </p>
                  <div>
                    <label className="block text-[9px] uppercase font-mono tracking-widest text-slate-500 mb-1.5 font-bold">Email Address</label>
                    <input
                      type="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="e.g., pilot@exportergroup.org"
                      className="w-full px-4 py-2.5 rounded-lg bg-black/40 border border-white/10 text-white placeholder-slate-600 focus:outline-none focus:border-blue-500 text-xs transition-colors"
                    />
                  </div>
                  <button
                    type="submit"
                    className="w-full py-2.5 bg-blue-500 hover:bg-blue-600 text-white rounded-lg text-xs font-semibold font-sans cursor-pointer transition-colors shadow-[0_0_15px_rgba(59,130,246,0.3)] flex items-center justify-center gap-2"
                  >
                    <span>Request Infrastructure Briefing</span>
                  </button>
                </form>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
