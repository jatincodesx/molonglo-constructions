import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: "class",
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}", "./lib/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        molonglo: {
          ink: "#1a1a1a",
          navy: "#2c3e50",
          red: "#c41230",
          ferrari: "#FF2800",
          gold: "#996515",
          bronze: "#8B5E3C",
          paper: "#f9f9f9"
        }
      },
      fontFamily: {
        sans: ["Aptos", "\"Helvetica Neue\"", "Arial", "sans-serif"],
        display: ["\"Iowan Old Style\"", "\"Palatino Linotype\"", "\"Book Antiqua\"", "Georgia", "serif"]
      },
      boxShadow: {
        soft: "0 18px 50px rgba(26, 26, 26, 0.12)",
        panel: "0 40px 90px rgba(12, 15, 14, 0.18)"
      }
    }
  },
  plugins: []
};

export default config;
