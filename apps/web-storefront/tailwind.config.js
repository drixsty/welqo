/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "../../packages/ui/src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: "class",
  theme: {
    extend: {
      animation: {
        "subtle-zoom": "subtle-zoom 20s ease-in-out infinite alternate",
        "fade-up": "fade-up 0.6s ease-out forwards",
        "fade-in": "fade-in 0.4s ease-out forwards",
        float: "float 6s ease-in-out infinite",
        "float-slow": "float 9s ease-in-out infinite reverse",
        "pulse-soft": "pulse-soft 3s ease-in-out infinite",
        "gradient-x": "gradient-x 8s ease infinite",
        shimmer: "shimmer 2s linear infinite",
        "slide-up": "slide-up 0.5s cubic-bezier(0.16, 1, 0.3, 1) forwards",
        "count-up": "fade-in 0.8s ease-out forwards",
      },
      keyframes: {
        "subtle-zoom": {
          "0%": { transform: "scale(1)" },
          "100%": { transform: "scale(1.08)" },
        },
        "fade-up": {
          "0%": { opacity: "0", transform: "translateY(20px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        "fade-in": {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
        float: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-12px)" },
        },
        "pulse-soft": {
          "0%, 100%": { opacity: "1" },
          "50%": { opacity: "0.6" },
        },
        "gradient-x": {
          "0%, 100%": { backgroundPosition: "0% 50%" },
          "50%": { backgroundPosition: "100% 50%" },
        },
        shimmer: {
          "0%": { backgroundPosition: "-200% 0" },
          "100%": { backgroundPosition: "200% 0" },
        },
        "slide-up": {
          "0%": { opacity: "0", transform: "translateY(30px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
      },
      backgroundSize: {
        "200%": "200%",
        "300%": "300%",
      },
      colors: {
        primary: {
          DEFAULT: "hsl(var(--primary) / <alpha-value>)",
          dark: "hsl(var(--primary-dark, 28 80% 45%) / <alpha-value>)",
          light: "hsl(var(--primary-light, 28 80% 60%) / <alpha-value>)",
          foreground: "hsl(var(--primary-foreground, 0 0% 100%) / <alpha-value>)",
        },
        welqo: {
          anthracite: {
            DEFAULT: "#2C3E50",
            dark: "#1a252f",
            light: "#3e5871",
          },
          terracotta: {
            DEFAULT: "hsl(var(--welqo-terracotta) / <alpha-value>)",
            dark: "hsl(var(--welqo-terracotta-dark, 28 80% 45%) / <alpha-value>)",
            light: "hsl(var(--welqo-terracotta-light, 28 80% 60%) / <alpha-value>)",
          },
          cream: {
            DEFAULT: "#F9F7F2",
            dark: "#f1eee4",
          },
        },
      },
      fontFamily: {
        sans: ["var(--font-inter)", "Inter", "sans-serif"],
        serif: ["var(--font-playfair)", "Playfair Display", "serif"],
      },
      boxShadow: {
        "glow-blue": "0 0 40px -8px rgba(37, 99, 235, 0.4)",
        "glow-blue-lg": "0 0 80px -12px rgba(37, 99, 235, 0.5)",
        card: "0 4px 24px -4px rgba(0,0,0,0.08), 0 1px 4px -1px rgba(0,0,0,0.04)",
        "card-hover":
          "0 16px 48px -8px rgba(0,0,0,0.16), 0 4px 12px -2px rgba(0,0,0,0.08)",
      },
    },
  },
  plugins: [require("@tailwindcss/typography")],
};
