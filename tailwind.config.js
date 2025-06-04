/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {},
  },
  plugins: [],
  safelist: [
    // 🎨 Background gradients
    'bg-gradient-to-tr',
    'from-orange-400',
    'via-white',
    'to-yellow-300',

    // 🎨 Background colors
    'bg-yellow-200',

    // 🎨 Text colors
    'text-red-600',
    'text-red-700',
    'text-gray-700',
    'text-white',

    // 🅰️ Font weights
    'font-normal',
    'font-medium',
    'font-semibold',
    'font-bold',
    'md:font-bold',

    // 🔠 Font sizes
    'text-lg',
  ]
}
