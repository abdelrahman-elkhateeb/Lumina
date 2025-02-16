/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        text: "#b0b0b3",
        background: "#151515",
        primary: "#f5f5f5",
        secondary: "#141416",
        accent: "#ff5500",
      },
    },
  },
  plugins: [],
};