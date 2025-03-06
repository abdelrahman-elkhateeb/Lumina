/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        text: "#f0f0f0",
        background: "#111111",
        primary: "#f5f5f5",
        secondary: "#141416",
        // accent: "#96e5c2",
        accent: "#f5e905"
      },
      fontFamily: {
        heading: ["Bebas Neue", "sans-serif"],
        body: ["Gabarito", "sans-serif"],
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
        fadeIn: "fadeIn 0.4s ease-in-out 0s forwards",
      },
    },
  },
  plugins: [],
};