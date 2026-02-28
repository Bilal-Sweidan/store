/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: "class",
  content: [
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        main: "rgb(var(--bg-main))",
        card: "rgb(var(--bg-card) / <alpha-value>)",
        header: "rgb(var(--header-bg) / <alpha-value>)",
        primary: "rgb(var(--text-primary) / <alpha-value>)",
        secondary: "rgb(var(--text-secondary) / <alpha-value>)",
        primaryText: "rgb(var(--accent) / <alpha-value>)",
      },
    },
  },
  plugins: [],
};
