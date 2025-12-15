/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,ts}"],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        primary: "#197fe6",
        "background-light": "#f6f7f8",
        "background-dark": "#111921",
        "surface-light": "#ffffff",
        "surface-dark": "#1a222c",
        brand: "#197fe6",
        mist: "#f6f7f8",
        accent: "#ff771b",
        ink: "#111418",
        pure: "#ffffff",
      },
      fontFamily: {
        sans: [
          "Inter",
          "system-ui",
          "-apple-system",
          "BlinkMacSystemFont",
          "Segoe UI",
          "sans-serif",
        ],
        serif: ["Playfair Display", "serif"],
        display: ["Inter", "sans-serif"],
      },
      boxShadow: {
        "luxe-glow": "0 30px 80px rgba(32, 71, 38, 0.25)",
        "luxe-soft": "0 18px 50px rgba(32, 71, 38, 0.18)",
      },
      borderRadius: {
        luxe: "24px",
        "luxe-sm": "18px",
      },
    },
  },
  plugins: [],
};
