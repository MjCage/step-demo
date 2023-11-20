import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic": "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      colors: {
        primary: "#5df7b5",
        "primary-bg": "#0d3628",
        secondary: "#f9ba00",
        accent: "#2c2d30",
        "gray-text": "#787878",
        "gray-bg": "#141414",
        "gray-inactive": "#0a0a0a",
        "disabled-text": "#b2b2b2",
        "disabled-bg": "#3d3d3d",
      },
    },
  },
  plugins: [],
};
export default config;
