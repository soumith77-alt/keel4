'use client';

import { motion, useReducedMotion } from 'framer-motion';

/**
 * The Keel system object.
 *
 * One set of 20 elements that changes FORM — not just position — between the
 * five things Keel builds. The previous version moved identical circles
 * around, which read as a loading spinner and said nothing about voice or
 * video. Here the primitives themselves morph:
 *
 *   voice     → tall thin bars on a baseline      (a waveform)
 *   workflow  → wide nodes joined by edges        (a graph)
 *   video     → three vertical creative reels      (short-form video)
 *   convert   → layered browser windows             (conversion websites)
 *   product   → modular product dashboard          (SaaS)
 *
 * Every element is a <rect>, so width/height/rx tween continuously between
 * a 26px-wide bar, a 150px node, and a 270px video frame. Elements a given
 * form does not need shrink to ambient dots rather than disappearing, which
 * is what keeps the morph readable instead of things popping in and out.
 *
 * `edgeOpacity` fades the connector paths in for the workflow form only.
 */

export const SYSTEM_FORMS = ['voice', 'workflow', 'video', 'convert', 'product'] as const;
export type SystemForm = (typeof SYSTEM_FORMS)[number];

const VIEW = 1000;
const N = 20;
/**
 * Indices 0-4 are a PRIMARY element in all four forms, so the accent always
 * lands on something substantial. At 5 it fell on a throwaway dot in the
 * funnel. At 4 it is the narrowest bottom bar — the visitor who books.
 */
const ACCENT = 4;

type Cell = { x: number; y: number; w: number; h: number; rx: number; o: number };

const q = (n: number) => Math.round(n * 100) / 100;

/** A fixed speech envelope — deliberately irregular, so it reads as a voice. */
const ENVELOPE = [
  0.18, 0.34, 0.62, 0.42, 0.86, 1.0, 0.72, 0.5, 0.28, 0.44, 0.68, 0.94, 0.76,
  0.38, 0.22, 0.56, 0.8, 0.46, 0.3, 0.16,
];

/** Graph node positions for the workflow form. */
const NODES = [
  { x: 60, y: 430 },
  { x: 330, y: 220 },
  { x: 330, y: 640 },
  { x: 620, y: 120 },
  { x: 620, y: 430 },
  { x: 620, y: 740 },
  { x: 830, y: 430 },
];
const NODE_W = 150;
const NODE_H = 66;

/** Edges as [from, to] index pairs into NODES. */
export const EDGES: [number, number][] = [
  [0, 1],
  [0, 2],
  [1, 3],
  [1, 4],
  [2, 4],
  [2, 5],
  [3, 6],
  [4, 6],
  [5, 6],
];

function dot(x: number, y: number, o = 0.28): Cell {
  return { x: q(x - 9), y: q(y - 9), w: 18, h: 18, rx: 9, o };
}

function voiceForm(i: number): Cell {
  const barW = 26;
  const gap = (VIEW - 120 - N * barW) / (N - 1);
  const h = 70 + ENVELOPE[i] * 480;
  return {
    x: q(60 + i * (barW + gap)),
    y: q(500 - h / 2),
    w: barW,
    h: q(h),
    rx: 13,
    o: 1,
  };
}

function workflowForm(i: number): Cell {
  if (i < NODES.length) {
    const n = NODES[i];
    return {
      x: q(n.x - NODE_W / 2 + 40),
      y: q(n.y - NODE_H / 2),
      w: NODE_W,
      h: NODE_H,
      rx: 12,
      o: 1,
    };
  }
  // Spare elements ride the edges as travelling data.
  const e = EDGES[(i - NODES.length) % EDGES.length];
  const a = NODES[e[0]];
  const b = NODES[e[1]];
  const t = 0.35 + ((i * 7) % 5) * 0.1;
  return dot(a.x + (b.x - a.x) * t + 40, a.y + (b.y - a.y) * t);
}

function videoForm(i: number): Cell {
  const cells: Cell[] = [
    { x: 90, y: 250, w: 230, h: 410, rx: 18, o: 1 },
    { x: 385, y: 160, w: 230, h: 450, rx: 18, o: 1 },
    { x: 680, y: 250, w: 230, h: 410, rx: 18, o: 1 },
    { x: 125, y: 350, w: 150, h: 24, rx: 8, o: 0.9 },
    { x: 472, y: 330, w: 56, h: 56, rx: 28, o: 1 },
    { x: 715, y: 350, w: 150, h: 24, rx: 8, o: 0.9 },
    { x: 425, y: 235, w: 150, h: 24, rx: 8, o: 0.9 },
    { x: 425, y: 275, w: 105, h: 14, rx: 7, o: 0.55 },
    { x: 425, y: 545, w: 150, h: 10, rx: 5, o: 0.55 },
    { x: 425, y: 485, w: 96, h: 34, rx: 10, o: 0.88 },
    dot(125, 285, 0.72),
    dot(420, 195, 0.72),
    dot(715, 285, 0.72),
    { x: 125, y: 565, w: 115, h: 14, rx: 7, o: 0.52 },
    { x: 715, y: 565, w: 115, h: 14, rx: 7, o: 0.52 },
    dot(285, 625, 0.42),
    dot(580, 575, 0.42),
    dot(875, 625, 0.42),
    { x: 125, y: 595, w: 75, h: 10, rx: 5, o: 0.35 },
    { x: 715, y: 595, w: 75, h: 10, rx: 5, o: 0.35 },
  ];
  return cells[i];
}

function convertForm(i: number): Cell {
  const cells: Cell[] = [
    { x: 90, y: 225, w: 670, h: 440, rx: 18, o: 0.55 },
    { x: 220, y: 120, w: 690, h: 470, rx: 18, o: 1 },
    { x: 260, y: 160, w: 600, h: 18, rx: 9, o: 0.45 },
    { x: 280, y: 250, w: 245, h: 42, rx: 8, o: 0.92 },
    { x: 280, y: 380, w: 130, h: 50, rx: 10, o: 1 },
    { x: 280, y: 315, w: 190, h: 16, rx: 8, o: 0.55 },
    { x: 585, y: 225, w: 260, h: 255, rx: 16, o: 0.22 },
    { x: 625, y: 270, w: 180, h: 165, rx: 82, o: 0.38 },
    { x: 125, y: 265, w: 300, h: 16, rx: 8, o: 0.4 },
    { x: 125, y: 325, w: 165, h: 32, rx: 8, o: 0.5 },
    dot(250, 160, 0.66),
    dot(280, 160, 0.66),
    dot(310, 160, 0.66),
    { x: 725, y: 160, w: 95, h: 16, rx: 8, o: 0.45 },
    { x: 615, y: 160, w: 82, h: 16, rx: 8, o: 0.35 },
    { x: 280, y: 490, w: 125, h: 58, rx: 10, o: 0.28 },
    { x: 425, y: 490, w: 125, h: 58, rx: 10, o: 0.28 },
    { x: 570, y: 490, w: 125, h: 58, rx: 10, o: 0.28 },
    { x: 125, y: 390, w: 210, h: 14, rx: 7, o: 0.32 },
    { x: 720, y: 500, w: 125, h: 48, rx: 10, o: 0.42 },
  ];
  return cells[i];
}

function productForm(i: number): Cell {
  const modules = [
    { x: 105, y: 150, w: 220, h: 120, rx: 14 },
    { x: 390, y: 150, w: 220, h: 120, rx: 14 },
    { x: 675, y: 150, w: 220, h: 120, rx: 14 },
    { x: 105, y: 330, w: 500, h: 380, rx: 14 },
    { x: 660, y: 330, w: 235, h: 380, rx: 14 },
  ];
  if (i < modules.length) return { ...modules[i], o: 1 };

  // Data bars live inside the main chart module.
  if (i < 13) {
    const k = i - 5;
    const heights = [72, 118, 90, 170, 132, 214, 182, 250];
    return {
      x: 145 + k * 54,
      y: 655 - heights[k],
      w: 28,
      h: heights[k],
      rx: 8,
      o: 0.72,
    };
  }

  // Activity rows inside the right-hand module.
  const k = i - 13;
  return {
    x: 700,
    y: 390 + k * 45,
    w: 150 - (k % 3) * 18,
    h: 12,
    rx: 6,
    o: 0.35,
  };
}

const FORMS: Record<SystemForm, (i: number) => Cell> = {
  voice: voiceForm,
  workflow: workflowForm,
  video: videoForm,
  convert: convertForm,
  product: productForm,
};

export default function KeelSystem({
  form,
  className,
}: {
  form: SystemForm;
  className?: string;
}) {
  const reduceMotion = useReducedMotion();
  const at = FORMS[form];
  const showEdges = form === 'workflow';
  const fillFor = (i: number) => {
    if (i === ACCENT) return '#00c776';
    if (form === 'video' && i >= 3) return '#f5f7fa';
    if (form === 'convert' && i >= 2) return '#f5f7fa';
    return 'currentColor';
  };

  return (
    <svg
      viewBox={`0 0 ${VIEW} ${VIEW}`}
      className={className}
      aria-hidden
      role="presentation"
    >
      {/* Edges sit behind the nodes and only exist for the workflow form. */}
      <g>
        {EDGES.map(([a, b], i) => {
          const p = NODES[a];
          const c = NODES[b];
          const d = `M ${p.x + 40} ${p.y} C ${(p.x + c.x) / 2 + 40} ${p.y}, ${
            (p.x + c.x) / 2 + 40
          } ${c.y}, ${c.x + 40} ${c.y}`;
          return (
            <motion.path
              key={i}
              d={d}
              fill="none"
              stroke="currentColor"
              strokeWidth={2}
              initial={false}
              animate={{ opacity: showEdges ? 0.22 : 0 }}
              transition={{ duration: reduceMotion ? 0 : 0.45 }}
            />
          );
        })}
      </g>

      {Array.from({ length: N }, (_, i) => {
        const c = at(i);
        return (
          <motion.rect
            key={i}
            initial={false}
            animate={{ x: c.x, y: c.y, width: c.w, height: c.h, rx: c.rx, opacity: c.o }}
            transition={
              reduceMotion
                ? { duration: 0 }
                : {
                    type: 'spring',
                    stiffness: 80,
                    damping: 18,
                    mass: 0.9,
                    delay: (i % 6) * 0.035,
                  }
            }
            fill={fillFor(i)}
          />
        );
      })}
    </svg>
  );
}
