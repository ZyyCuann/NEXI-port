'use client';

import { useRef, useState } from 'react';
import { motion, useInView } from 'framer-motion';
import { Hexagon } from 'lucide-react';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { ecosystemNodes } from '@/lib/data';

const domesticNodes = ecosystemNodes.filter((n) => n.type === 'domestic');
const internationalNodes = ecosystemNodes.filter((n) => n.type === 'international');

/* ── Radial positioning for hub-and-spoke on desktop ── */
const allNodes = [...domesticNodes, ...internationalNodes];
const totalNodes = allNodes.length;

function getNodePosition(index: number, total: number) {
  const angleOffset = -Math.PI / 2; // start from top
  const angle = angleOffset + (2 * Math.PI * index) / total;
  const radiusX = 280; // horizontal radius
  const radiusY = 240; // vertical radius
  const x = Math.cos(angle) * radiusX;
  const y = Math.sin(angle) * radiusY;
  return { x, y, angle };
}

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1 } },
};

const nodeVariants = {
  hidden: { opacity: 0, scale: 0.5 },
  visible: { opacity: 1, scale: 1, transition: { duration: 0.5, ease: 'easeOut' as const } },
};

const lineVariants = {
  hidden: { pathLength: 0, opacity: 0 },
  visible: { pathLength: 1, opacity: 0.3, transition: { duration: 0.8, ease: 'easeOut' as const } },
};

export default function EcosystemSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: '-100px' });
  const [hoveredNode, setHoveredNode] = useState<string | null>(null);

  return (
    <div ref={sectionRef} className="relative w-full overflow-visible">
      {/* Background accents */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none -z-10">
        <div className="absolute top-1/3 left-1/4 w-[500px] h-[500px] bg-cyan-500/5 rounded-full blur-3xl pointer-events-none -z-10" />
        <div className="absolute bottom-1/3 right-1/4 w-[500px] h-[500px] bg-blue-500/5 rounded-full blur-3xl pointer-events-none -z-10" />
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        <SectionHeading
          title="Built for a National and Global Trade Ecosystem."
          subtitle="Potential integration pathways and ecosystem alignment — not official partnerships."
          gradient
          align="center"
        />

        {/* ───── Desktop: Hub-and-spoke visualization ───── */}
        <div className="hidden lg:block">
          <motion.div
            className="relative mx-auto"
            style={{ width: 700, height: 600 }}
            variants={containerVariants}
            initial="hidden"
            animate={isInView ? 'visible' : 'hidden'}
          >
            {/* Connection lines SVG */}
            <svg
              className="absolute inset-0 w-full h-full pointer-events-none"
              viewBox="-350 -300 700 600"
            >
              {allNodes.map((node, idx) => {
                const pos = getNodePosition(idx, totalNodes);
                return (
                  <motion.line
                    key={`line-${node.name}`}
                    x1={0}
                    y1={0}
                    x2={pos.x}
                    y2={pos.y}
                    stroke={hoveredNode === node.name ? 'rgb(59, 130, 246)' : 'rgb(148, 163, 184)'}
                    strokeWidth={hoveredNode === node.name ? 2 : 1}
                    strokeDasharray="4 4"
                    variants={lineVariants}
                    className="transition-colors duration-300"
                  />
                );
              })}
            </svg>

            {/* Center hub */}
            <motion.div
              className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-20"
              initial={{ opacity: 0, scale: 0 }}
              animate={isInView ? { opacity: 1, scale: 1 } : {}}
              transition={{ duration: 0.6, type: 'spring' }}
            >
              <div className="w-28 h-28 rounded-full bg-gradient-to-br from-blue-500 to-cyan-500 flex items-center justify-center shadow-[0_0_40px_rgba(59,130,246,0.4)] border-2 border-white/20">
                <div className="text-center">
                  <Hexagon className="w-6 h-6 text-white mx-auto mb-1" />
                  <span className="text-xs font-bold text-white tracking-wider">NEXII</span>
                  <span className="block text-[10px] text-white/80 font-medium">PORT</span>
                </div>
              </div>
            </motion.div>

            {/* Surrounding nodes */}
            {allNodes.map((node, idx) => {
              const pos = getNodePosition(idx, totalNodes);
              const isDomestic = node.type === 'domestic';
              return (
                <motion.div
                  key={node.name}
                  className="absolute z-10"
                  style={{
                    left: `calc(50% + ${pos.x}px)`,
                    top: `calc(50% + ${pos.y}px)`,
                    transform: 'translate(-50%, -50%)',
                  }}
                  variants={nodeVariants}
                  onMouseEnter={() => setHoveredNode(node.name)}
                  onMouseLeave={() => setHoveredNode(null)}
                >
                  <div
                    className={`
                      relative rounded-xl border p-4 backdrop-blur-xl transition-all duration-300 cursor-default min-w-[130px] text-center
                      ${hoveredNode === node.name
                        ? 'border-blue-500/50 bg-blue-500/10 dark:bg-blue-500/10 shadow-[0_0_20px_rgba(59,130,246,0.2)] scale-110'
                        : isDomestic
                          ? 'border-emerald-500/20 bg-white/70 dark:bg-white/5'
                          : 'border-violet-500/20 bg-white/70 dark:bg-white/5'
                      }
                    `}
                  >
                    <node.icon className={`w-5 h-5 mx-auto mb-2 ${isDomestic ? 'text-emerald-500' : 'text-violet-400'}`} />
                    <span className="text-xs font-semibold text-slate-800 dark:text-slate-200 block">
                      {node.name}
                    </span>

                    {/* Tooltip on hover */}
                    {hoveredNode === node.name && (
                      <motion.div
                        initial={{ opacity: 0, y: 5 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="absolute left-1/2 -translate-x-1/2 top-full mt-2 w-56 p-3 rounded-lg bg-slate-900 dark:bg-slate-800 text-white text-xs leading-relaxed shadow-xl z-30 pointer-events-none"
                      >
                        {node.purpose}
                        <div className="absolute -top-1 left-1/2 -translate-x-1/2 w-2 h-2 rotate-45 bg-slate-900 dark:bg-slate-800" />
                      </motion.div>
                    )}
                  </div>
                </motion.div>
              );
            })}
          </motion.div>
        </div>

        {/* ───── Mobile: Two-column list layout ───── */}
        <div className="lg:hidden">
          <motion.div
            className="grid grid-cols-1 md:grid-cols-2 gap-8"
            variants={containerVariants}
            initial="hidden"
            animate={isInView ? 'visible' : 'hidden'}
          >
            {/* Domestic */}
            <div>
              <h3 className="text-lg font-semibold text-slate-800 dark:text-slate-200 mb-4 flex items-center gap-2">
                <span>🇮🇩</span> Domestic Ecosystem
              </h3>
              <div className="space-y-3">
                {domesticNodes.map((node) => (
                  <motion.div
                    key={node.name}
                    variants={nodeVariants}
                    className="rounded-xl border border-slate-200 dark:border-white/10 bg-white/70 dark:bg-white/5 backdrop-blur-xl p-4 flex items-start gap-3"
                  >
                    <node.icon className="w-5 h-5 text-emerald-500 flex-shrink-0 mt-0.5" />
                    <div>
                      <span className="text-sm font-semibold text-slate-800 dark:text-slate-200 block">
                        {node.name}
                      </span>
                      <span className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
                        {node.purpose}
                      </span>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* International */}
            <div>
              <h3 className="text-lg font-semibold text-slate-800 dark:text-slate-200 mb-4 flex items-center gap-2">
                <span>🌏</span> Global Ecosystem
              </h3>
              <div className="space-y-3">
                {internationalNodes.map((node) => (
                  <motion.div
                    key={node.name}
                    variants={nodeVariants}
                    className="rounded-xl border border-slate-200 dark:border-white/10 bg-white/70 dark:bg-white/5 backdrop-blur-xl p-4 flex items-start gap-3"
                  >
                    <node.icon className="w-5 h-5 text-violet-400 flex-shrink-0 mt-0.5" />
                    <div>
                      <span className="text-sm font-semibold text-slate-800 dark:text-slate-200 block">
                        {node.name}
                      </span>
                      <span className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
                        {node.purpose}
                      </span>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>

        {/* Disclaimer */}
        <motion.p
          className="text-xs text-slate-500 text-center mt-12 max-w-2xl mx-auto"
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.5, delay: 1 }}
        >
          These represent potential integration pathways and ecosystem alignment directions, not official partnerships or endorsements.
        </motion.p>
      </div>
    </div>
  );
}
