import { useState } from 'react';
import type { Survey } from '../../models';
import QuestionContainer from './QuestionContainer';

export type SurveyContainerProps = {
  id: string;
};

const survey: Survey = {
  title: 'Renkler Hakkında Quiz',
  questions: [
    {
      id: 1,
      label: 'En sevdiğin renk hangisi?',
      answers: [
        { id: 1, label: 'Mavi', isCorrect: false },
        { id: 2, label: 'Beyaz', isCorrect: false },
        { id: 3, label: 'Yeşil', isCorrect: true },
        { id: 4, label: 'Sarı', isCorrect: false },
      ],
    },
    {
      id: 2,
      label: 'Güneşin rengi nedir?',
      answers: [
        { id: 1, label: 'Sarı', isCorrect: true },
        { id: 2, label: 'Kırmızı', isCorrect: false },
        { id: 3, label: 'Mavi', isCorrect: false },
        { id: 4, label: 'Yeşil', isCorrect: false },
      ],
    },
  ],
};

const theme = {
  gradient: 'bg-gradient-to-tr from-yellow-300 via-orange-400 to-red-400',
  text: 'text-white',
};

export default function SurveyContainer({ id }: SurveyContainerProps) {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);

  const question = survey.questions[currentQuestionIndex];

  if (!survey) return <div>Anket bulunamadı.</div>;

  return (
    <div className={`w-full min-h-screen flex flex-col items-center px-4 pt-4 md:pt-8 lg:pt-12 ${theme.gradient} ${theme.text}`}>
      <h1 className="mb-6 md:mb-8 lg:mb-10 text-xl md:text-3xl lg:text-5xl font-semibold md:font-bold lg:font-extrabold drop-shadow-lg">{survey.title}</h1>
      <div className="text-xs md:text-sm lg:text-base">
        Soru {currentQuestionIndex + 1} / {survey.questions.length}
      </div>
      <QuestionContainer question={question} />
    </div>
  );
}
