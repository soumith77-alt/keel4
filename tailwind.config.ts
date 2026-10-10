import type { Config } from "tailwindcss";

/**
 * Design tokens — the Keeel brand palette on a light editorial layout.
 *
 * `surface`, `fg`, `line`, `hairline`, `signal` and `mint` resolve through CSS
 * variables in globals.css (`.theme-light` / `.theme-dark`), so a section
 * inverts by swapping one class.
 *
 * BRAND: navy ink #0e1836, brand navy #253c80 (LOCKED, fills only), green
 * accent #00c776. These are the existing brand colours and must not change.
 *
 * CONTRAST (measured, WCAG 2.x):
 *   #0e1836 ink        on #f2f2f0 page   15.6:1
 *   #4a5268 secondary  on #f2f2f0 page    6.9:1
 *   #00794a green text on #f2f2f0 page    4.9:1   on #ffffff 5.5:1
 *   #ffffff on #0e1836 (primary button)  17.5:1   on #253c80 hover 10.3:1
 *   #0e1836 on #00c776 (selected chip)    7.8:1
 *   #00c776 green      on #0e1836 navy    7.8:1   ← green text on dark
 *   #00c776 green      on #f2f2f0 page    ~2:1    ← FAILS: fill only on light
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
        // Ink-based hairline; alpha applied at the call site (border-line/15).
        line: "rgb(var(--line) / <alpha-value>)",
        // Opaque subtle border: #d6d9e0 on light.
        hairline: "rgb(var(--hairline) / <alpha-value>)",
        // Green as TEXT, theme-scoped: #00794a on light, #00c776 on navy.
        signal: "rgb(var(--signal-text) / <alpha-value>)",
        // Pale green well.
        mint: "rgb(var(--mint) / <alpha-value>)",
        // Navy ink #0e1836 — text, primary buttons, the dark section.
        ink: "rgb(var(--ink) / <alpha-value>)",
        // Accent ramp — the single green. Read the contrast note above.
        accent: {
          400: "#3fe0a0",
          500: "#00c776", // fill only on light; text-safe on navy
          600: "#00a862",
          700: "#00794a", // green text on light
          DEFAULT: "#00c776",
        },
        // Brand ramp — navy, hue locked ~226deg.
        brand: {
          200: "#b9c8f0",
          300: "#8ba3e0",
          400: "#5b77c9",
          500: "#3d5aa0",
          600: "#253c80", // LOCKED, fills only
          700: "#1e3170",
          800: "#16244f",
          900: "#0e1836",
          DEFAULT: "#253c80",
        },
        // Rationed cobalt, kept for existing call sites.
        technical: {
          400: "#7aa0ff",
          500: "#3d6bff",
          600: "#2a4fd7",
          DEFAULT: "#3d6bff",
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
      /**
       * TWO FAMILIES. `display` is an alias of `sans`: headings and body are
       * one voice at different sizes. There is deliberately no `serif` key.
       */
      fontFamily: {
        sans: ["var(--font-sans)", "ui-sans-serif", "system-ui", "sans-serif"],
        display: ["var(--font-sans)", "ui-sans-serif", "system-ui", "sans-serif"],
        mono: ["var(--font-mono)", "ui-monospace", "SFMono-Regular", "monospace"],
      },
      aspectRatio: {
        "project-featured": "16 / 10",
        "project-standard": "16 / 10",
        "project-mobile": "4 / 3",
      },
      // Cards 16–24px, controls 10px, buttons and chips fully rounded.
      borderRadius: {
        control: "10px",
        card: "16px",
        panel: "24px",
        pill: "9999px",
      },
      boxShadow: {
        // Soft, ink-tinted elevation. Thin borders do most of the work.
        "glow-sm": "0 1px 2px rgba(14, 24, 54, 0.05), 0 2px 8px -2px rgba(14, 24, 54, 0.06)",
        "glow-md": "0 1px 2px rgba(14, 24, 54, 0.05), 0 12px 32px -12px rgba(14, 24, 54, 0.16)",
        "glow-lg": "0 2px 4px rgba(14, 24, 54, 0.04), 0 32px 64px -24px rgba(14, 24, 54, 0.24)",
        panel: "0 24px 64px -32px rgba(14, 24, 54, 0.35)",
        // Product frames: a crisp contact shadow plus a long soft fall-off.
        frame:
          "0 0 0 1px rgba(14, 24, 54, 0.06), 0 2px 6px rgba(14, 24, 54, 0.05), 0 40px 80px -32px rgba(14, 24, 54, 0.28)",
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
      /**
       * Motion tiers (see globals.css):
       *   fast   180ms  hover and control feedback
       *   base   300ms  panel transitions
       *   slow   480ms  section reveals
       */
      transitionTimingFunction: {
        out: "cubic-bezier(0.22, 1, 0.36, 1)",
        "in-out": "cubic-bezier(0.65, 0, 0.35, 1)",
        micro: "cubic-bezier(0.32, 0.72, 0, 1)",
      },
      transitionDuration: {
        fast: "180ms",
        base: "300ms",
        slow: "480ms",
        scene: "700ms",
      },
      maxWidth: {
        prose: "44rem", // 704px, long-form
        content: "77.5rem", // 1240px, the site column
        wide: "77.5rem",
      },
      animation: {
        marquee: "marquee 40s linear infinite",
      },
      keyframes: {
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
