/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        light: {
          text: "#2d6186",        // Light mode text color
          background: "#ffffff", // Light mode background color
          primary: "#c0e8f2",     // Light mode primary color
          secondary: "#80bdd6",   // Light mode secondary color
          accent: "#0f8db3",       // Light mode accent color
        },
        dark: {
          text: "#79add2",         // Dark mode text color
          background: "#000000",  // Dark mode background color
          primary: "#0d353f",      // Dark mode primary color
          secondary: "#29677f",    // Dark mode secondary color
          accent: "#4ccaf0",       // Dark mode accent color
        },
      },
    },
  },
  plugins: [],
};