/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,ts}"],
  theme: {
    extend: {
      colors: {
        // Core brand (from logo)
        brand: "#F2B705", // Industrial Gold (logo yellow)
        power: "#C4161C", // Power Red (logo red)
        carbon: "#0B0B0B", // Deep black background
        charcoal: "#1A1A1A", // Soft black for sections

        // UI & surfaces
        pure: "#FAFAFA", // Clean industrial white
        steel: "#8A8A8A", // Muted gray text
        accent: "#D99A00", // Hover / secondary accent
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
      },

      boxShadow: {
        "industrial-strong": "0 20px 50px rgba(0, 0, 0, 0.45)",
        "industrial-soft": "0 10px 30px rgba(0, 0, 0, 0.25)",
      },

      borderRadius: {
        luxe: "22px",
        "luxe-sm": "14px",
      },
    },
  },
  plugins: [],
};
