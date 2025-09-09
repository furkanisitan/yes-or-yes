import type { Theme } from './models';

export const themes: Record<string, Theme> = {
  default: {
    survey: 'bg-gradient-to-tr from-orange-400 via-white to-yellow-300',
    surveyTitle: 'text-red-600 font-semibold md:font-bold',
    question: 'text-gray-700 font-normal',
    note: 'text-gray-600 font-normal',
    answer: 'bg-yellow-200 text-red-700 text-lg font-medium',
  },
  yellowBox: {
    survey: 'bg-gradient-to-br from-amber-200 via-rose-100 to-lime-100',
    surveyTitle: 'text-cyan-600 font-semibold md:font-bold',
    question: 'text-gray-700 font-normal',
    note: 'text-gray-500 font-normal',
    answer: 'bg-amber-300 text-gray-700 text-sm md:text-lg font-medium md:font-semibold',
  },
  coffeeTea: {
    survey: 'bg-gradient-to-tr from-amber-900 via-amber-200 to-lime-200',
    surveyTitle: 'text-lime-800 font-semibold md:font-bold',
    question: 'text-amber-900 font-semibold',
    note: 'text-amber-800 font-semibold',
    answer: 'bg-gradient-to-br from-amber-900 via-amber-200 to-lime-200 text-green-900 text-sm md:text-lg font-medium md:font-semibold shadow-lg',
  },
  pinkyGirl: {
    survey: 'bg-gradient-to-tr from-pink-200 via-fuchsia-100 to-rose-300',
    surveyTitle: 'text-pink-700 font-bold md:font-extrabold',
    question: 'text-fuchsia-700 font-medium',
    note: 'text-fuchsia-600 font-medium',
    answer: 'bg-pink-300 text-white text-lg font-semibold shadow-md',
  },
  harryPotter: {
    survey:
      "relative bg-[url('/images/harry-potter-bg.jpg')] bg-cover bg-center " +
      "before:content-[''] before:absolute before:inset-0 " +
      "before:bg-gradient-to-b before:from-black/70 before:to-black/60",
    surveyTitle: "relative z-10 bg-gradient-to-r from-yellow-300 via-yellow-100 to-yellow-400 bg-clip-text text-transparent font-extrabold drop-shadow-lg",
    question: "relative z-10 text-yellow-100 font-medium",
    note: "relative z-10 text-yellow-200 font-light italic opacity-70",
    answer:
      "relative z-10 bg-yellow-500/5 border border-yellow-400/10 " +
      "backdrop-blur-sm text-yellow-100 text-sm md:text-lg font-medium md:font-semibold"
  }
};
