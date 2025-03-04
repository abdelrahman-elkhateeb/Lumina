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
        flicker: {
          "0%, 100%": { opacity: "0.2" },
          "50%": { opacity: "1" },
        },
        fadeIn: {
          "0%": { opacity: "0", transform: "translateY(10px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
      },
      animation: {
        falling: "falling 10s linear infinite",
        flicker: "flicker 0.2s ease-in-out 3",
        fadeIn: "fadeIn 1.5s ease-in-out 3s forwards",
      },
    },
  },
  plugins: [],
};