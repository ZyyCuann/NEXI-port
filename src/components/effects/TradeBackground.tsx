'use client';

import { motion, useScroll, useTransform } from 'framer-motion';

export function TradeBackground() {
  const { scrollYProgress } = useScroll();
  const shipY = useTransform(scrollYProgress, [0, 1], [30, -120]);
  const planeX = useTransform(scrollYProgress, [0, 1], [0, 160]);
  const routesY = useTransform(scrollYProgress, [0, 1], [70, -80]);
  const railsX = useTransform(scrollYProgress, [0, 1], [-60, 80]);

  return (
    <div className="pointer-events-none fixed inset-0 z-0 overflow-hidden">
      <motion.svg
        aria-hidden="true"
        className="absolute left-[-18%] top-[9%] h-[72vh] w-[140vw] opacity-[0.12] dark:opacity-[0.16] md:left-[-10%] md:w-[120vw]"
        viewBox="0 0 1400 720"
        fill="none"
        style={{ y: routesY }}
      >
        <path d="M30 430C250 210 420 550 650 330C875 114 1060 168 1350 70" stroke="currentColor" className="text-blue-800/60 dark:text-cyan-200/70" strokeWidth="1.2" strokeDasharray="8 12" />
        <path d="M120 610C410 360 550 650 850 390C1050 215 1165 305 1320 215" stroke="currentColor" className="text-slate-500/60 dark:text-blue-200/40" strokeWidth="1" strokeDasharray="5 16" />
        <path d="M230 120C410 240 520 90 720 210C910 325 1050 150 1260 350" stroke="currentColor" className="text-blue-700/40 dark:text-cyan-300/35" strokeWidth="1" />
        <circle cx="650" cy="330" r="4" className="fill-blue-600/50 dark:fill-cyan-300/60">
          <animate attributeName="opacity" values="0.25;0.8;0.25" dur="5s" repeatCount="indefinite" />
        </circle>
        <circle cx="1030" cy="178" r="3" className="fill-blue-600/40 dark:fill-cyan-300/55">
          <animate attributeName="opacity" values="0.2;0.7;0.2" dur="6s" repeatCount="indefinite" />
        </circle>
      </motion.svg>

      <motion.svg
        aria-hidden="true"
        className="absolute bottom-[7%] left-[-8%] hidden h-[260px] w-[620px] opacity-[0.11] dark:opacity-[0.16] sm:block"
        viewBox="0 0 620 260"
        fill="none"
        style={{ y: shipY }}
      >
        <path d="M48 168H510L458 220H115L48 168Z" stroke="currentColor" className="text-slate-700 dark:text-cyan-100" strokeWidth="2" />
        <path d="M120 128H440L505 168H70L120 128Z" stroke="currentColor" className="text-blue-700 dark:text-cyan-200" strokeWidth="1.4" />
        {[
          [138, 96], [194, 96], [250, 96], [306, 96], [362, 96],
          [166, 128], [222, 128], [278, 128], [334, 128], [390, 128],
        ].map(([x, y]) => (
          <rect key={`${x}-${y}`} x={x} y={y} width="46" height="28" rx="2" stroke="currentColor" className="text-blue-700/80 dark:text-cyan-200/70" strokeWidth="1" />
        ))}
        <path d="M452 92H498V168" stroke="currentColor" className="text-slate-600 dark:text-white/70" strokeWidth="1.4" />
        <path d="M472 92V56H554" stroke="currentColor" className="text-slate-600 dark:text-white/70" strokeWidth="1.4" />
        <path d="M554 56L530 82" stroke="currentColor" className="text-slate-600 dark:text-white/70" strokeWidth="1.4" />
      </motion.svg>

      <motion.svg
        aria-hidden="true"
        className="absolute right-[-12%] top-[14%] h-[210px] w-[460px] opacity-[0.10] dark:opacity-[0.16]"
        viewBox="0 0 460 210"
        fill="none"
        style={{ x: planeX }}
      >
        <path d="M38 112L424 48L384 82L254 124L324 182L280 190L188 142L88 166L38 112Z" stroke="currentColor" className="text-blue-800 dark:text-cyan-100" strokeWidth="1.8" strokeLinejoin="round" />
        <path d="M188 142L151 78L190 72L254 124" stroke="currentColor" className="text-slate-600 dark:text-blue-100/70" strokeWidth="1.2" />
        <path d="M76 118H16M114 95H54M142 76H94" stroke="currentColor" className="text-blue-500 dark:text-cyan-300" strokeWidth="1" strokeDasharray="6 10" />
      </motion.svg>

      <motion.div
        aria-hidden="true"
        className="absolute bottom-[18%] right-[-4%] hidden h-[360px] w-[520px] opacity-[0.08] dark:opacity-[0.12] lg:block"
        style={{ x: railsX }}
      >
        <div className="h-full w-full rounded-[2rem] border border-slate-600/40 bg-[linear-gradient(90deg,rgba(30,64,175,0.28)_1px,transparent_1px),linear-gradient(0deg,rgba(30,64,175,0.22)_1px,transparent_1px)] bg-[size:52px_42px] dark:border-cyan-300/20 dark:bg-[linear-gradient(90deg,rgba(34,211,238,0.25)_1px,transparent_1px),linear-gradient(0deg,rgba(34,211,238,0.18)_1px,transparent_1px)]" />
      </motion.div>

      <motion.div
        aria-hidden="true"
        className="absolute left-0 top-[58%] h-px w-[120vw] -rotate-6 bg-gradient-to-r from-transparent via-blue-500/20 to-transparent dark:via-cyan-300/25"
        style={{ x: railsX }}
      />
      <motion.div
        aria-hidden="true"
        className="absolute left-[-20%] top-[70%] h-px w-[130vw] rotate-3 bg-gradient-to-r from-transparent via-slate-500/20 to-transparent dark:via-blue-300/20"
        style={{ x: railsX }}
      />
    </div>
  );
}
