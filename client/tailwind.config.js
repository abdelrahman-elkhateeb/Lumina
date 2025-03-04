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
        accent: "#96e5c2",
      },
      fontFamily: {
        heading: ["Poppins", "sans-serif"],
        body: ["Inter", "sans-serif"],
        accent: ["Space Mono", "monospace"],
      },
      keyframes: {
        falling: {
          "0%": { transform: "translateY(-10vh)", opacity: "0.8" },
          "100%": { transform: "translateY(100vh)", opacity: "0.2" },
        },
      },
      animation: {
        falling: "falling 10s linear infinite",
      },
    },
  },
  plugins: [],
};