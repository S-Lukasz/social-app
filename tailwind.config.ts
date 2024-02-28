import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    colors: {
      transparent: "transparent",
      current: "currentColor",
      "my-very-dark": "#121216",
      "my-dark": "#16171b",
      "my-front-items": "#222327",
      "my-light": "#2a2a2e",
      "my-accent": "#6a9ae7",
      "my-text-light": "#c7c7c7",
      "my-text-medium": "#8d8d8e",
      "my-text-dark": "#5c5c5c",
    },
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
    },
  },
  plugins: [],
};
export default config;
