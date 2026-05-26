'use client';

import { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import { Sun, Moon, Monitor, Tablet, Smartphone, Menu, X } from 'lucide-react';
import { useTheme } from '@/lib/theme-provider';
import { useDevicePreview, type DeviceMode } from '@/lib/device-preview-context';

const navLinks = [
  { label: 'Problem', id: 'problem' },
  { label: 'Solution', id: 'solution' },
  { label: 'Flow', id: 'flow' },
  { label: 'Infrastructure', id: 'infrastructure' },
  { label: 'Ecosystem', id: 'ecosystem' },
  { label: 'Demo', id: 'demo' },
  { label: 'Roadmap', id: 'roadmap' },
];

const deviceOptions: { mode: DeviceMode; icon: typeof Monitor; label: string }[] = [
  { mode: 'desktop', icon: Monitor, label: 'Desktop' },
  { mode: 'tablet', icon: Tablet, label: 'Tablet' },
  { mode: 'mobile', icon: Smartphone, label: 'Mobile' },
];

export function Navbar() {
  const { theme, toggleTheme, mounted } = useTheme();
  const { device, setDevice } = useDevicePreview();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [deviceDropdownOpen, setDeviceDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
    setMobileMenuOpen(false);
  };

  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setDeviceDropdownOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <nav className="fixed top-0 left-0 right-0 z-[9999] bg-white/90 dark:bg-[#030712]/90 backdrop-blur-md border-b border-slate-200/60 dark:border-white/10 h-20 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-6 md:px-10 h-full flex items-center justify-between">
        {/* Logo */}
        <button
          onClick={() => scrollToSection('hero')}
          className="font-heading font-bold text-xl tracking-tight bg-gradient-to-r from-blue-500 to-cyan-500 bg-clip-text text-transparent cursor-pointer hover:opacity-90 transition-opacity"
        >
          NEXII PORT
        </button>

        {/* Center Nav — hidden on tablet/mobile */}
        <div className="hidden lg:flex items-center gap-6 xl:gap-8">
          {navLinks.map((link) => (
            <button
              key={link.id}
              onClick={() => scrollToSection(link.id)}
              className="group relative text-sm font-medium text-slate-600 dark:text-slate-300 transition-all duration-300 cursor-pointer hover:-translate-y-0.5 hover:text-cyan-600 dark:hover:text-cyan-300"
            >
              <span className="relative z-10">{link.label}</span>
              <span className="absolute left-0 -bottom-2 h-px w-0 bg-gradient-to-r from-blue-500 to-cyan-400 transition-all duration-300 group-hover:w-full" />
              <span className="absolute left-1/2 -bottom-2.5 h-1 w-1 -translate-x-1/2 rounded-full bg-cyan-400 opacity-0 shadow-[0_0_10px_rgba(34,211,238,0.65)] transition-opacity duration-300 group-hover:opacity-100" />
              <span className="absolute inset-x-0 -bottom-3 h-4 bg-cyan-400/0 blur-md transition-colors duration-300 group-hover:bg-cyan-400/10" />
            </button>
          ))}
        </div>

        {/* Right actions */}
        <div className="flex items-center gap-3">
          <Link
            href="/try-now"
            className="hidden sm:inline-flex h-10 items-center justify-center rounded-lg bg-gradient-to-r from-blue-600 to-cyan-500 px-4 text-sm font-semibold text-white shadow-md shadow-blue-500/10 transition-all duration-300 hover:-translate-y-0.5 hover:from-blue-500 hover:to-cyan-400 hover:shadow-cyan-500/20"
          >
            Try Now
          </Link>

          {/* Theme Toggle */}
          <button
            onClick={toggleTheme}
            className="w-10 h-10 rounded-lg flex items-center justify-center text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-white/5 transition-colors cursor-pointer"
            aria-label="Toggle theme"
          >
            {mounted ? (
              theme === 'dark' ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />
            ) : (
              <div className="w-5 h-5" />
            )}
          </button>

          {/* Device Preview Dropdown */}
          <div className="relative hidden md:block" ref={dropdownRef}>
            <button
              onClick={() => setDeviceDropdownOpen(!deviceDropdownOpen)}
              className="w-10 h-10 rounded-lg flex items-center justify-center text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-white/5 transition-colors cursor-pointer"
              aria-label="Device preview"
            >
              {device === 'desktop' && <Monitor className="w-5 h-5" />}
              {device === 'tablet' && <Tablet className="w-5 h-5" />}
              {device === 'mobile' && <Smartphone className="w-5 h-5" />}
            </button>

            {deviceDropdownOpen && (
              <div className="absolute right-0 top-full mt-2 bg-white dark:bg-[#0a1628] border border-slate-200 dark:border-white/10 rounded-xl shadow-xl p-1 min-w-[140px] z-[9999]">
                {deviceOptions.map((opt) => {
                  const Icon = opt.icon;
                  return (
                    <button
                      key={opt.mode}
                      onClick={() => {
                        setDevice(opt.mode);
                        setDeviceDropdownOpen(false);
                      }}
                      className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg text-sm transition-colors cursor-pointer ${
                        device === opt.mode
                          ? 'bg-blue-500/10 text-blue-500 font-semibold'
                          : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-white/5'
                      }`}
                    >
                      <Icon className="w-4 h-4" />
                      {opt.label}
                    </button>
                  );
                })}
              </div>
            )}
          </div>

          {/* Mobile hamburger menu button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden w-10 h-10 rounded-lg flex items-center justify-center text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-white/5 transition-colors cursor-pointer"
            aria-label="Menu"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-t border-slate-200/60 dark:border-white/10 bg-white/95 dark:bg-[#030712]/95 backdrop-blur-md shadow-lg">
          <div className="px-6 py-4 space-y-2 flex flex-col">
            <Link
              href="/try-now"
              onClick={() => setMobileMenuOpen(false)}
              className="w-full rounded-lg bg-gradient-to-r from-blue-600 to-cyan-500 px-4 py-3 text-left text-base font-semibold text-white shadow-md shadow-blue-500/10 transition-all"
            >
              Try Now
            </Link>
            {navLinks.map((link) => (
              <button
                key={link.id}
                onClick={() => scrollToSection(link.id)}
                className="w-full text-left px-4 py-3 rounded-lg text-base font-medium text-slate-600 dark:text-slate-400 hover:text-blue-500 hover:bg-slate-100 dark:hover:bg-white/5 transition-all cursor-pointer"
              >
                {link.label}
              </button>
            ))}
          </div>
        </div>
      )}
    </nav>
  );
}
