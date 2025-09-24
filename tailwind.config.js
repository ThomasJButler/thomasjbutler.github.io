/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./react.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
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
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
        // Matrix theme colors
        matrix: {
          green: "var(--matrix-green)",
          primary: "hsl(var(--matrix-primary, 120 100% 50%))", // Default matrix green
          bg: "var(--bg-primary)",
          "bg-secondary": "var(--bg-secondary)",
          "text-primary": "var(--text-primary)",
          "text-secondary": "var(--text-secondary)",
        },
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      animation: {
        "fade-in": "fade-in 0.5s ease-in-out",
        "fade-up": "fade-up 0.5s ease-out",
        "matrix-glow": "matrix-glow 2s ease-in-out infinite alternate",
      },
      keyframes: {
        "fade-in": {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
        "fade-up": {
          "0%": { opacity: "0", transform: "translateY(20px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        "matrix-glow": {
          "0%": { boxShadow: "0 0 5px rgba(0, 255, 0, 0.3)" },
          "100%": { boxShadow: "0 0 20px rgba(0, 255, 0, 0.6)" },
        },
      },
      boxShadow: {
        'matrix': '0 0 10px rgba(0, 255, 0, 0.3)',
        'matrix-lg': '0 0 20px rgba(0, 255, 0, 0.4)',
        'matrix-glow': '0 0 30px rgba(0, 255, 0, 0.6)',
      },
    },
  },
  plugins: [],
}