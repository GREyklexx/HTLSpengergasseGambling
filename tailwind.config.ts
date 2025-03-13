import { type Config } from "tailwindcss";
import plugin from "@tailwindcss/line-clamp";

export default {
  content: ["{routes,islands,components}/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        // Dark theme
        "bg-primary": "#121212",
        "bg-secondary": "#1e1e1e",
        "text-primary": "#ffffff",
        "text-secondary": "#b3b3b3",

        // Accent colors
        "accent-blue": "#00c8ff",
        "accent-purple": "#b721ff",
        "accent-green": "#18ff6d",

        // Game colors
        "slots-primary": "#ff6b00",
        "blackjack-primary": "#00a651",
        "roulette-primary": "#e40000",
      },
      fontFamily: {
        sans: ["Inter", "system-ui", "sans-serif"],
        display: ["'Chakra Petch'", "sans-serif"],
      },
      animation: {
        glow: "glow 2s ease-in-out infinite alternate",
        float: "float 3s ease-in-out infinite",
        "spin-slow": "spin 3s linear infinite",
      },
      keyframes: {
        glow: {
          "0%": {
            textShadow:
              "0 0 5px #fff, 0 0 10px #fff, 0 0 15px #00c8ff, 0 0 20px #00c8ff",
          },
          "100%": {
            textShadow:
              "0 0 10px #fff, 0 0 20px #fff, 0 0 30px #00c8ff, 0 0 40px #00c8ff",
          },
        },
        float: {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-10px)" },
        },
      },
    },
  },
  plugins: [plugin],
} satisfies Config;
