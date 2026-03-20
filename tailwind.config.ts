import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/lib/**/*.{js,ts,jsx,tsx,mdx}",
    "./styles/**/*.{css}",
  ],
  theme: {
    extend: {
      colors: {
        espresso: "#1C0F0A",
        roast: "#3B1E0E",
        caramel: "#B07040",
        cream: "#F5EDD8",
        steam: "#FAF6EE",
        gold: "#C9973A",
      },
      fontFamily: {
        display: ["var(--font-cormorant)", "Cormorant Garamond", "Georgia", "serif"],
        body: ["var(--font-dm-sans)", "DM Sans", "system-ui", "sans-serif"],
      },
      keyframes: {
        "fade-up": {
          "0%": { opacity: "0", transform: "translateY(20px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
      },
      animation: {
        "fade-up": "fade-up 0.6s ease-out forwards",
      },
    },
  },
};

export default config;
