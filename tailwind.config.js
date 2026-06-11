/** @type {import('tailwindcss').Config} */
export default {
  darkMode: ['class'],
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
      },
      fontFamily: {
        sans: ['"Space Grotesk"', 'sans-serif'], 
        heading: ['"Outfit"', 'sans-serif'],     
        hero: ['"Syne"', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
