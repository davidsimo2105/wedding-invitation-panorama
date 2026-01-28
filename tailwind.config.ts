import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        gold: "#c9a876",
        "dark-gold": "#8b6f47",
        tan: "#e8dcc8",
        cream: "#f8f5f0",
        navy: "#000035",
        brown: "#895129",
        "light-brown": "#a67c52",
      },
      animation: {
        "fade-in": "fadeIn 1s ease-in forwards",
        "fade-in-up": "fadeInUp 1s ease-out forwards",
        "float": "float 3s ease-in-out infinite",
        "pulse-slow": "pulse 3s ease-in-out infinite",
        "slide-up": "slideUp 0.8s ease-out forwards",
      },
      keyframes: {
        fadeIn: {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
        fadeInUp: {
          "0%": { opacity: "0", transform: "translateY(30px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        slideUp: {
          "0%": { opacity: "0", transform: "translateY(60px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        float: {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-20px)" },
        },
      },
    },
  },
  plugins: [],
};
export default config;
