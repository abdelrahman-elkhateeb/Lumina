/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        text: "#FFFFFF",
        background: {
          500: "#0A0A24", // Deep Night Sky
          700: "#1C1678", // Dark Indigo
        },
        primary: {
          500: "#857EE7", // Soft Starry Purple
          700: "#3328D7", // Deep Cosmic Blue
        },
        secondary: {
          500: "#7866FF", // Vibrant Night Glow
          700: "#4B33FF", // Intense Nebula Blue
        },
        accent: {
          500: "#7BC9FF", // Glowing Sky Blue
          700: "#A3FFD6", // Soft Nebula Green
        },
      },
      //   'text': {
      //     50: '#071112',
      //     100: '#0e2325',
      //     200: '#1d4649',
      //     300: '#2b696e',
      //     400: '#398b93',
      //     500: '#47aeb8',
      //     600: '#6cbec6',
      //     700: '#91cfd4',
      //     800: '#b6dfe2',
      //     900: '#daeff1',
      //     950: '#edf7f8',
      //   },
      //   'background': {
      //     50: '#071313',
      //     100: '#0e2525',
      //     200: '#1b4b4b',
      //     300: '#297070',
      //     400: '#369696',
      //     500: '#44bbbb',
      //     600: '#69c9c9',
      //     700: '#8fd6d6',
      //     800: '#b4e4e4',
      //     900: '#daf1f1',
      //     950: '#ecf8f8',
      //   },
      //   'primary': {
      //     50: '#061113',
      //     100: '#0d2326',
      //     200: '#19464d',
      //     300: '#266973',
      //     400: '#338b99',
      //     500: '#40aebf',
      //     600: '#66becc',
      //     700: '#8ccfd9',
      //     800: '#b3dfe6',
      //     900: '#d9eff2',
      //     950: '#ecf7f9',
      //   },
      //   'secondary': {
      //     50: '#061214',
      //     100: '#0c2327',
      //     200: '#18474e',
      //     300: '#246a75',
      //     400: '#308e9c',
      //     500: '#3cb1c3',
      //     600: '#63c1cf',
      //     700: '#8ad0db',
      //     800: '#b1e0e7',
      //     900: '#d8eff3',
      //     950: '#ebf7f9',
      //   },
      //   'accent': {
      //     50: '#061214',
      //     100: '#0b2428',
      //     200: '#164850',
      //     300: '#226c77',
      //     400: '#2d909f',
      //     500: '#38b4c7',
      //     600: '#60c3d2',
      //     700: '#88d2dd',
      //     800: '#afe1e9',
      //     900: '#d7f0f4',
      //     950: '#ebf7f9',
      //   },
      // },
      // colors: {
      //   'text': '#071112',
      //   'background': '#f4fbfb',
      //   'primary': '#47b1c2',
      //   'secondary': '#8ad0db',
      //   'accent': '#70c9d7',
      // },
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
        loader: {
          "0%": { boxShadow: "0px 0px 0 0px" },
          "90%, 100%": { boxShadow: "20px 20px 0 -4px" },
        },
        layerTr: {
          "0%": { transform: "translate(0, 0) scale(1)" },
          "100%": { transform: "translate(-25px, -25px) scale(1)" },
        },
      },
      animation: {
        falling: "falling 10s linear infinite",
        flicker: "flicker 0.2s ease-in-out 3",
        fadeIn: "fadeIn 0.4s ease-in-out 0s forwards",
        loader: "loader 1s linear infinite alternate",
        layerTr: "layerTr 1s linear infinite alternate",
      },
    },
  },
  plugins: [],
};
