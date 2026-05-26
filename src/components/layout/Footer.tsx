'use client';

const navLinks = [
  { label: 'Flow', href: 'flow' },
  { label: 'Infrastructure', href: 'infrastructure' },
  { label: 'Ecosystem', href: 'ecosystem' },
  { label: 'Demo', href: 'demo' },
  { label: 'Roadmap', href: 'roadmap' },
];

const resourceLinks = [
  { label: 'Assurance Standards', href: '#' },
  { label: 'API Reference', href: '#' },
  { label: 'Legal Framework', href: '#' },
];

export function Footer() {
  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <footer className="py-16 px-6 border-t border-slate-200/50 dark:border-white/5 bg-slate-50 dark:bg-black/90 relative z-20">
      <div className="max-w-7xl mx-auto">
        {/* Top Section */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Brand */}
          <div>
            <h3 className="font-heading font-bold text-xl bg-gradient-to-r from-blue-500 to-cyan-400 bg-clip-text text-transparent mb-2">
              NEXII PORT
            </h3>
            <p className="text-sm font-semibold text-slate-800 dark:text-slate-200 mb-1 leading-snug">
              Nusantara Export and Import Infrastructure
            </p>
            <p className="text-xs text-slate-500 italic mt-1 font-medium">Reinventing Trade Trust.</p>
          </div>

          {/* Navigation */}
          <div>
            <h4 className="font-semibold text-xs uppercase tracking-wider text-slate-400 dark:text-slate-500 mb-4 font-bold">
              Navigation
            </h4>
            <ul className="space-y-2">
              {navLinks.map((link) => (
                <li key={link.href}>
                  <button
                    onClick={() => scrollTo(link.href)}
                    className="text-xs font-semibold text-slate-600 dark:text-slate-400 hover:text-blue-500 dark:hover:text-blue-400 transition-colors cursor-pointer"
                  >
                    {link.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h4 className="font-semibold text-xs uppercase tracking-wider text-slate-400 dark:text-slate-500 mb-4 font-bold">
              Compliance
            </h4>
            <ul className="space-y-2">
              {resourceLinks.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    className="text-xs font-semibold text-slate-600 dark:text-slate-400 hover:text-blue-500 dark:hover:text-blue-400 transition-colors"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Legal Disclaimer */}
        <div className="mt-12 pt-8 border-t border-slate-200/50 dark:border-white/15">
          <p className="text-[10px] text-slate-500 dark:text-slate-400 leading-relaxed max-w-4xl text-justify font-sans">
            NEXII PORT is a conceptual digital trade assurance infrastructure. It does not operate as a bank, public cryptocurrency exchange, payment institution, or legal arbitrator. Tokenized escrow state refers to a non-tradable digital representation of transaction status and locked value within the platform workflow. Future CBDC compatibility is presented as a roadmap alignment.
          </p>
        </div>

        {/* Copyright */}
        <div className="mt-8 flex justify-between items-center flex-wrap gap-4">
          <p className="text-[10px] font-mono text-slate-400 dark:text-slate-500">
            © 2026 NEXII PORT. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
