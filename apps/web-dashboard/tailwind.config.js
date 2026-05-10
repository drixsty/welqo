/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        welqo: {
          anthracite: {
            DEFAULT: "#2C3E50",
            dark: "#1a252f",
            light: "#3e5871",
          },
          terracotta: {
            DEFAULT: "#E67E22",
            dark: "#d35400",
            light: "#f39c12",
          },
          cream: {
            DEFAULT: "#F9F7F2",
            dark: "#f1eee4",
          },
        },
      },
      animation: {
        "fade-up": "fade-up 0.5s ease-out forwards",
        "subtle-pulse": "subtle-pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite",
      },
      keyframes: {
        "fade-up": {
          "0%": { opacity: "0", transform: "translateY(16px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        "subtle-pulse": {
          "0%, 100%": { opacity: "1" },
          "50%": { opacity: "0.85" },
        },
      },
      fontFamily: {
        sans: ["var(--font-inter)", "Inter", "sans-serif"],
        serif: ["var(--font-playfair)", "Playfair Display", "serif"],
      },
    },
  },
  plugins: [],
};
