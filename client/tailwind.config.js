/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        text: "#b0b0b3", // Dimmed text for readability
        background: "#151515", // Deep black background
        primary: "#f5f5f5", // Darker white for contrast
        secondary: "#141416", // Darker secondary background
        accent: "#ff5500", // Vibrant accent color (bold orange-red)
      },
    },
  },
  plugins: [],
};