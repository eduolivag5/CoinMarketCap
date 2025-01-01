/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: 'var(--color-primary)', // Utiliza la variable CSS
        secondary: 'var(--color-secondary)', // Utiliza la variable CSS
        background: 'var(--color-background)', // Utiliza la variable CSS
        text: 'var(--color-text)', // Utiliza la variable CSS
        positive: '#15c783',
        negative: '#b93139'
      },
    },
  },
  plugins: [],
  darkMode: 'class'
}

