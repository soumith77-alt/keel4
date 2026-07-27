import type { Config } from "tailwindcss";

/**
 * Design tokens — light editorial studio, navy ink, single green accent.
 *
 * `surface`, `fg` and `line` resolve through CSS variables defined in
 * globals.css under `.theme-light` / `.theme-dark`. A section inverts by
 * swapping one class; no child needs restyling. See <Section tone="…">.
 *
 * ONE STRUCTURAL NAVY. `ink` (#0e1836) is every dark field: inversion bands,
 * CTA band, primary buttons, body copy. Painting a large area in any other
 * blue is what made the site read as though the blue kept changing. The
 * locked brand-600 (#253c80) survives as a hover/active state only.
 *
 * CONTRAST RULE — getting it wrong ships invisible text:
 *
 *   · Accent green #00c776 (accent-500) measures ~2:1 on the off-white
 *     canvas. FILL only on light — buttons, chips, the hero accent shape.
 *     Green TEXT on light must be accent-700 (#00794a, 5.4:1).
 *     On navy, accent-500 clears ~7:1 and is safe for text and hairlines.
 */
const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        // Surfaces — theme-scoped, see globals.css
        surface: {
          DEFAULT: "rgb(var(--canvas) / <alpha-value>)",
          raised: "rgb(var(--canvas-raised) / <alpha-value>)",
          overlay: "rgb(var(--canvas-overlay) / <alpha-value>)",
        },
        // Foreground / text — theme-scoped
        fg: {
          DEFAULT: "rgb(var(--fg) / <alpha-value>)",
          muted: "rgb(var(--fg-muted) / <alpha-value>)",
          subtle: "rgb(var(--fg-subtle) / <alpha-value>)",
        },
        // Hairlines — flips polarity with the theme. Use border-line/20 etc.
        line: "rgb(var(--line) / <alpha-value>)",
        // The single structural navy — every dark field on the site.
        ink: "rgb(var(--ink) / <alpha-value>)",
        // Accent ramp — the single green. Read the contrast rule above.
        accent: {
          400: "#3fe0a0",
          500: "#00c776", // fill only on light; text-safe on navy
          600: "#00a862",
          700: "#00794a", // green text on light — 5.4:1
          DEFAULT: "#00c776",
        },
        // Brand ramp — hue locked ~226deg
        brand: {
          200: "#b9c8f0",
          300: "#8ba3e0", // accent text on dark, 8.6:1
          400: "#5b77c9",
          500: "#3d5aa0",
          600: "#253c80", // LOCKED, fills only
          700: "#1e3170",
          800: "#16244f",
          900: "#0e1836",
          DEFAULT: "#253c80",
        },
        // shadcn semantic aliases (consumed by components/ui/button.tsx)
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
      },
      fontFamily: {
        sans: ["var(--font-sans)", "ui-sans-serif", "system-ui", "sans-serif"],
        display: ["var(--font-display)", "var(--font-sans)", "sans-serif"],
        mono: ["var(--font-mono)", "ui-monospace", "SFMono-Regular", "monospace"],
      },
      // Sharp-to-lightly-rounded. The previous rounded-2xl everywhere is a
      // large part of why the site read as generic.
      borderRadius: {
        card: "4px",
        panel: "6px",
        control: "3px",
        pill: "9999px",
      },
      boxShadow: {
        // On the light canvas depth is a real shadow. The glow-* names are
        // kept (call sites depend on them) but now read as soft elevation;
        // inside .theme-dark they still land as navy bloom because the
        // shadow colour is close to the band surface.
        "glow-sm": "0 1px 2px rgba(14, 24, 54, 0.06), 0 4px 12px -4px rgba(14, 24, 54, 0.1)",
        "glow-md": "0 2px 4px rgba(14, 24, 54, 0.06), 0 12px 32px -8px rgba(14, 24, 54, 0.14)",
        "glow-lg": "0 4px 8px rgba(14, 24, 54, 0.07), 0 32px 64px -16px rgba(14, 24, 54, 0.18)",
        panel: "0 24px 64px -32px rgba(14, 24, 54, 0.35)",
        // Explicit green bloom, for accent fills only
        accent: "0 8px 32px -8px rgba(0, 199, 118, 0.4)",
      },
      zIndex: {
        base: "0",
        raised: "10",
        sticky: "20",
        nav: "40",
        float: "60",
        modal: "100",
      },
      transitionTimingFunction: {
        out: "cubic-bezier(0.22, 1, 0.36, 1)",
        "in-out": "cubic-bezier(0.65, 0, 0.35, 1)",
      },
      transitionDuration: {
        fast: "150ms",
        base: "240ms",
        slow: "400ms",
      },
      maxWidth: {
        prose: "44rem", // 704px, long-form
        content: "72rem", // 1152px, default sections
        wide: "84rem", // 1344px, full-width grids
      },
      animation: {
        float: "float 6s ease-in-out infinite",
        glow: "glow 3s ease-in-out infinite alternate",
        marquee: "marquee 40s linear infinite",
      },
      keyframes: {
        float: {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-10px)" },
        },
        glow: {
          "0%": { opacity: "0.4" },
          "100%": { opacity: "0.8" },
        },
        marquee: {
          "0%": { transform: "translateX(0)" },
          "100%": { transform: "translateX(-50%)" },
        },
      },
    },
  },
  plugins: [],
};
export default config;
