import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      keyframes: {
        shake: {
          "0%": { transform: "rotate(0deg)" },
          "25%": { transform: "rotate(-15deg)" },
          "50%": { transform: "rotate(0deg)" },
          "75%": { transform: "rotate(15deg)" },
          "100%": { transform: "rotate(0deg)" },
        },
      },
      animation: {
        shake: "shake 1s linear infinite",
      },
    },
  },
  plugins: [],
};

export default config;
