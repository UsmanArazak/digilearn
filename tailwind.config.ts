import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        accent: "#CCFF00",
        white: "#ffffff",
        "off-white": "#fafafa",
        "light-bg": "#f5f5f5",
      },
    },
  },
  plugins: [],
};
export default config;
