import type { Config } from "tailwindcss";

/**
 * Design tokens — light editorial product studio, one emerald accent.
 *
 * `surface`, `fg`, `line`, `hairline`, `signal` and `mint` resolve through CSS
 * variables defined in globals.css under `.theme-light` / `.theme-dark`, so a
 * section inverts by swapping one class and no child needs restyling.
 *
 * CONTRAST (measured, WCAG 2.x):
 *
 *   #111814 text      on #F6F5F0 page   16.5:1   on #FFFFFF 18.0:1
 *   #526158 secondary on #F6F5F0 page    6.0:1   on #E5F1EA mint 5.6:1
 *   #146C50 emerald   on #F6F5F0 page    5.9:1   on #E5F1EA mint 5.5:1
 *   #FFFFFF on #146C50 (primary button)  6.4:1
 *   #6FD3A5 emerald   on #101A15 dark    9.8:1   ← emerald TEXT on dark
 *   #146C50 emerald   on #101A15 dark    2.8:1   ← FAILS: never text on dark
 *
 * `accent-500` (#1F8A63) is 4.3:1 against white — a FILL and stroke colour
 * (dots, beams, focus rings), never body text. Green text is `text-signal`,
 * which picks the right step for whichever surface it lands on.
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
        // The specified subtle border, #DDE3DB on light. Opaque by default.
        hairline: "rgb(var(--hairline) / <alpha-value>)",
        // Green as TEXT, theme-scoped: #146C50 on light, #6FD3A5 on dark.
        signal: "rgb(var(--signal-text) / <alpha-value>)",
        // Pale mint well — #E5F1EA on light, a deep green tint on dark.
        mint: "rgb(var(--mint) / <alpha-value>)",
        // The dark feature surface, #101A15.
        ink: "rgb(var(--ink) / <alpha-value>)",
        emerald: {
          DEFAULT: "#146C50",
          hover: "#0F5A42",
          light: "#6FD3A5",
        },
        // Accent ramp — the single green. Read the contrast note above.
        accent: {
          400: "#6FD3A5", // text-safe on dark
          500: "#1F8A63", // fills and strokes only
          600: "#17775A",
          700: "#146C50", // text-safe on light
          DEFAULT: "#146C50",
        },
        /**
         * Legacy ramp names, re-pointed at deep greens so older call sites
         * (`hover:bg-brand-600`, the voice orb) land inside the palette rather
         * than reintroducing navy.
         */
        brand: {
          200: "#C9DDD2",
          300: "#9CC5B0",
          400: "#4FA27F",
          500: "#1F8A63",
          600: "#0F5A42",
          700: "#0C4835",
          800: "#0A3628",
          900: "#101A15",
          DEFAULT: "#146C50",
        },
        technical: {
          400: "#6FD3A5",
          500: "#1F8A63",
          600: "#146C50",
          DEFAULT: "#1F8A63",
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
        "glow-sm": "0 1px 2px rgba(17, 24, 20, 0.05), 0 2px 8px -2px rgba(17, 24, 20, 0.06)",
        "glow-md": "0 1px 2px rgba(17, 24, 20, 0.05), 0 12px 32px -12px rgba(17, 24, 20, 0.16)",
        "glow-lg": "0 2px 4px rgba(17, 24, 20, 0.04), 0 32px 64px -24px rgba(17, 24, 20, 0.24)",
        panel: "0 24px 64px -32px rgba(17, 24, 20, 0.35)",
        // Product frames: a crisp contact shadow plus a long soft fall-off.
        frame:
          "0 0 0 1px rgba(17, 24, 20, 0.06), 0 2px 6px rgba(17, 24, 20, 0.05), 0 40px 80px -32px rgba(17, 24, 20, 0.28)",
        accent: "0 8px 24px -10px rgba(20, 108, 80, 0.45)",
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
