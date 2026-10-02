import type { Config } from "tailwindcss";

export default {
  darkMode: "class",
  content: ["./index.html", "./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        ink: "#0b1020",
        brand: {
          50: "#eef8ff",
          100: "#d8efff",
          500: "#2388ff",
          600: "#1469d8",
          700: "#1155b3"
        }
      },
      boxShadow: {
        glow: "0 24px 80px rgba(35, 136, 255, 0.20)"
      }
    }
  },
  plugins: []
} satisfies Config;
