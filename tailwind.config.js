module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx}", // Next.js App Router
    "./pages/**/*.{js,ts,jsx,tsx}", // Pages Router (if used)
    "./components/**/*.{js,ts,jsx,tsx}", // Components Folder
    "./src/**/*.{js,ts,jsx,tsx}", // Include src directory
  ],
  theme: {
    extend: {
      colors: {
        neonBlue: "#0ff",
        deepBlack: "#090909",
        darkGray: "#121212",
      },
    },
  },
  plugins: [require("daisyui")],
};
