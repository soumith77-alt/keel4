import type { Config } from "tailwindcss";

/**
 * Design tokens — dark premium studio.
 *
 * Brand navy #253c80 is LOCKED (brand-600). It measures 1.9:1 against the dark
 * canvas, so it is used as a FILL only — buttons, the CTA band, active states.
 * On-dark text and accents use brand-300/400, which clear 4.5:1 comfortably.
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
        // Surfaces
        surface: {
          DEFAULT: "#07080c",
          raised: "#0e1018",
          overlay: "#141826",
        },
        // Foreground / text
        fg: {
          DEFAULT: "#f5f7fa", // 19:1 on surface
          muted: "#a3abbd", // 8:1
          subtle: "#8b93a6", // 6.1:1, raised; 4.6:1 lost small labels
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
        // Retained so existing markup keeps compiling during the migration
        accent: {
          DEFAULT: "#253c80",
          dark: "#1e3170",
          light: "#3d5aa0",
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
        // Depth on dark surfaces comes from glow, not drop shadow
        "glow-sm": "0 0 24px -6px rgba(91, 119, 201, 0.35)",
        "glow-md": "0 0 48px -12px rgba(61, 90, 160, 0.45)",
        "glow-lg": "0 0 96px -24px rgba(37, 60, 128, 0.6)",
        panel: "0 24px 64px -32px rgba(0, 0, 0, 0.9)",
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
