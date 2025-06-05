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
    'bg-gradient-to-br',
    'from-orange-400',
    'from-amber-900',
    'from-amber-200',
    'via-white',
    'via-amber-200',
    'via-rose-100',
    'to-yellow-300',
    'to-lime-200',
    'to-lime-100',

    // 🎨 Background colors
    'bg-yellow-200',
    'bg-amber-300',

    // 🎨 Text colors
    'text-red-600',
    'text-red-700',
    'text-gray-700',
    'text-white',
    'text-lime-800',
    'text-amber-900',
    'text-green-900',
    'text-cyan-600',

    // 🅰️ Font weights
    'font-normal',
    'font-medium',
    'font-semibold',
    'font-bold',
    'md:font-bold',
    'md:font-semibold',

    // 🔠 Font sizes
    'text-lg',
    'text-sm',
    'md:text-lg',

    // 💎 Shadow
    'shadow-lg',
  ]
}
