/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      fontFamily: {
        sans: [
          "Lexend",
          "ui-sans-serif",
          "system-ui",
          "-apple-system",
          "Segoe UI",
          "Roboto",
          "sans-serif",
        ],
      },
      colors: {
        moss: {
          900: "#383b34",
          800: "#4a4d44",
          700: "#2f3529",
          600: "#263025",
        },
        paper: "#f2f3ef",
        paperink: "#23261f",
        paperlabel: "#7c8177",
        sprout: "#cfe6b8",
      },
    },
  },
  plugins: [],
};
