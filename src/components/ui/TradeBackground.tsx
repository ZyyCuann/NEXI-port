'use client';

import { useEffect, useState } from 'react';
import { motion, useScroll, useSpring, useTransform } from 'framer-motion';

export function TradeBackground() {
  const { scrollYProgress } = useScroll();
  const [motionScale, setMotionScale] = useState(1);

  useEffect(() => {
    const updateMotionScale = () => {
      if (window.matchMedia('(max-width: 767px)').matches) {
        setMotionScale(0.5);
      } else if (window.matchMedia('(max-width: 1023px)').matches) {
        setMotionScale(0.7);
      } else {
        setMotionScale(1);
      }
    };

    updateMotionScale();
    window.addEventListener('resize', updateMotionScale);
    return () => window.removeEventListener('resize', updateMotionScale);
  }, []);

  const shipYRaw = useTransform(scrollYProgress, [0, 1], [120 * motionScale, -260 * motionScale]);
  const planeXRaw = useTransform(scrollYProgress, [0, 1], [-180 * motionScale, 320 * motionScale]);
  const routeYRaw = useTransform(scrollYProgress, [0, 1], [180 * motionScale, -180 * motionScale]);
  const gridXRaw = useTransform(scrollYProgress, [0, 1], [-24 * motionScale, 36 * motionScale]);
  const gridYRaw = useTransform(scrollYProgress, [0, 1], [18 * motionScale, -34 * motionScale]);

  const springConfig = { stiffness: 95, damping: 26, mass: 0.45 };
  const shipY = useSpring(shipYRaw, springConfig);
  const planeX = useSpring(planeXRaw, springConfig);
  const routeY = useSpring(routeYRaw, springConfig);
  const gridX = useSpring(gridXRaw, springConfig);
  const gridY = useSpring(gridYRaw, springConfig);

  return (
    <div className="pointer-events-none fixed inset-0 z-[1] overflow-hidden">
      {/* Global route curves */}
      <motion.svg
        style={{ y: routeY }}
        className="absolute left-0 top-20 h-[520px] w-full opacity-55 dark:opacity-45"
        viewBox="0 0 1440 520"
        fill="none"
        aria-hidden="true"
      >
        <path
          d="M-100 360 C 220 100, 520 420, 850 180 C 1080 40, 1260 180, 1540 80"
          stroke="currentColor"
          strokeWidth="2"
          strokeDasharray="10 14"
          className="text-blue-900/35 dark:text-cyan-300/45"
        />
        <path
          d="M-80 450 C 300 280, 550 120, 920 340 C 1120 460, 1320 280, 1540 360"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeDasharray="8 12"
          className="text-blue-700/35 dark:text-blue-300/35"
        />
        <circle cx="850" cy="180" r="5" className="fill-blue-700/45 dark:fill-cyan-300/70" />
        <circle cx="1120" cy="340" r="4" className="fill-blue-600/45 dark:fill-blue-300/65" />
      </motion.svg>

      {/* Cargo ship outline */}
      <motion.svg
        style={{ y: shipY }}
        className="absolute -left-20 bottom-10 h-[260px] w-[760px] opacity-50 dark:opacity-42"
        viewBox="0 0 760 260"
        fill="none"
        aria-hidden="true"
      >
        <path
          d="M80 170 H620 L570 220 H150 L80 170Z"
          stroke="currentColor"
          strokeWidth="3"
          className="text-blue-950/38 dark:text-cyan-200/55"
        />
        <path
          d="M180 120 H540 V170 H180 V120Z"
          stroke="currentColor"
          strokeWidth="2"
          className="text-blue-900/34 dark:text-cyan-200/42"
        />
        <path
          d="M210 95 H300 V120 H210 V95Z M320 95 H410 V120 H320 V95Z M430 95 H520 V120 H430 V95Z"
          stroke="currentColor"
          strokeWidth="2"
          className="text-blue-900/34 dark:text-cyan-200/42"
        />
        <path
          d="M220 145 H250 M275 145 H305 M330 145 H360 M385 145 H415 M440 145 H470 M495 145 H525"
          stroke="currentColor"
          strokeWidth="2"
          className="text-blue-900/30 dark:text-cyan-200/36"
        />
      </motion.svg>

      {/* Air freight outline */}
      <motion.svg
        style={{ x: planeX }}
        className="absolute right-10 top-32 h-[140px] w-[320px] opacity-50 dark:opacity-42"
        viewBox="0 0 320 140"
        fill="none"
        aria-hidden="true"
      >
        <path
          d="M30 75 L285 45 C300 42 306 52 292 60 L215 85 L235 118 L213 122 L170 98 L95 118 L78 110 L135 82 L30 75Z"
          stroke="currentColor"
          strokeWidth="2.5"
          className="text-blue-950/36 dark:text-blue-200/55"
        />
      </motion.svg>

      {/* Container grid */}
      <motion.div
        style={{ x: gridX, y: gridY }}
        className="absolute right-[-120px] bottom-[-80px] h-[420px] w-[620px] opacity-30 dark:opacity-24"
      >
        <div className="h-full w-full rounded-[3rem] border border-blue-800/22 bg-[linear-gradient(to_right,rgba(30,64,175,0.16)_1px,transparent_1px),linear-gradient(to_bottom,rgba(30,64,175,0.16)_1px,transparent_1px)] bg-[size:64px_48px] dark:border-cyan-300/24 dark:bg-[linear-gradient(to_right,rgba(6,182,212,0.18)_1px,transparent_1px),linear-gradient(to_bottom,rgba(6,182,212,0.18)_1px,transparent_1px)]" />
      </motion.div>
    </div>
  );
}
