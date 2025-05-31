import { useState } from "react";
import type { Survey } from "../../models";
import QuestionContainer from "./QuestionContainer";

export type SurveyContainerProps = {
  id: string;
};

const survey: Survey = {
  title: "Renkler Hakkında Quiz",
  questions: [
    {
      id: 1,
      label: "En sevdiğin renk hangisi?",
      answers: [
        { id: 1, label: "Mavi", isCorrect: false },
        { id: 2, label: "Beyaz", isCorrect: false },
        { id: 3, label: "Yeşil", isCorrect: true },
        { id: 4, label: "Sarı", isCorrect: false },
      ],
    },
    {
      id: 2,
      label: "Güneşin rengi nedir?",
      answers: [
        { id: 1, label: "Sarı", isCorrect: true },
        { id: 2, label: "Kırmızı", isCorrect: false },
        { id: 3, label: "Mavi", isCorrect: false },
        { id: 4, label: "Yeşil", isCorrect: false },
      ],
    },
  ],
};

export default function SurveyContainer({ id }: SurveyContainerProps) {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);

  const question = survey.questions[currentQuestionIndex];

  if (!survey) return <div>Anket bulunamadı.</div>;

  return (
    <div className="w-full min-h-screen flex flex-col items-center bg-gradient-to-tr from-yellow-300 via-orange-400 to-red-400 text-white px-4 pt-12">
      <h1 className="text-5xl font-extrabold mb-6 drop-shadow-lg">{survey.title}</h1>
      <div className="w-full max-w-5xl text-center mt-4">
        <div className="mb-2 text-lg opacity-90">
          Soru {currentQuestionIndex + 1} / {survey.questions.length}
        </div>
        <QuestionContainer question={question} />
        <div className="flex justify-between mt-8">
          <button
            className="px-4 py-2 bg-white/30 rounded disabled:opacity-50"
            onClick={() => setCurrentQuestionIndex((i) => i - 1)}
            disabled={currentQuestionIndex === 0}
          >
            Önceki
          </button>
          <button
            className="px-4 py-2 bg-white/30 rounded disabled:opacity-50"
            onClick={() => setCurrentQuestionIndex((i) => i + 1)}
            disabled={currentQuestionIndex === survey.questions.length - 1}
          >
            Sonraki
          </button>
        </div>
      </div>
    </div>
  );
}
