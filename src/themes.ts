import type { Theme } from './models';

export const themes: Record<string, Theme> = {
  default: {
    survey: 'bg-gradient-to-tr from-orange-400 via-white to-yellow-300',
    surveyTitle: 'text-red-600 font-semibold md:font-bold',
    question: 'text-gray-700 font-normal',
    answer: 'bg-yellow-200 text-red-700 text-lg font-medium',
  },
  yellowBox: {
    survey: 'bg-gradient-to-br from-amber-200 via-rose-100 to-lime-100',
    surveyTitle: 'text-cyan-600 font-semibold md:font-bold',
    question: 'text-gray-700 font-normal',
    answer: 'bg-amber-300 text-gray-700 text-sm md:text-lg font-medium md:font-semibold',
  },
  coffeeTea: {
    survey: 'bg-gradient-to-tr from-amber-900 via-amber-200 to-lime-200',
    surveyTitle: 'text-lime-800 font-semibold md:font-bold',
    question: 'text-amber-900 font-semibold',
    answer: 'bg-gradient-to-br from-amber-900 via-amber-200 to-lime-200 text-green-900 text-sm md:text-lg font-medium md:font-semibold shadow-lg',
  },
};
