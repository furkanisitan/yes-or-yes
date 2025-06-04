import { useState, useEffect } from 'react';
import type { Survey } from '../../models';
import QuestionContainer from './QuestionContainer';
import { useParams } from 'react-router-dom';
import { surveyService } from '../../services';
import { useRef } from 'react';
import Fireworks from 'react-canvas-confetti/dist/presets/fireworks';

const theme = {
  gradient: 'bg-gradient-to-tr from-orange-400 via-white to-yellow-300',
  text: 'text-red-600',
};

export default function SurveyContainer() {
  const { id } = useParams<{ id: string }>();
  const [survey, setSurvey] = useState<Survey | null>(null);
  const [showCongrats, setShowCongrats] = useState(false);

  const fireworksController = useRef<any>(null);

  useEffect(() => {
    async function fetchSurvey() {
      const data = await surveyService.getById(id!);
      if (data) setSurvey(data!);
    }
    if (id) fetchSurvey();
  }, [id]);

  useEffect(() => {
    if (survey) surveyService.addLog(id!, 'login');
  }, [survey]);

  useEffect(() => {
    if (showCongrats) fireworksController.current?.run({ speed: 3 });
    else fireworksController.current?.pause();
  }, [showCongrats]);

  function handleCorrect() {
    setShowCongrats(true);
    surveyService.addLog(id!, 'correct');
  }

  const handleInit = ({ conductor }: any) => {
    fireworksController.current = conductor;
  };

  if (!survey) return null;

  return (
    <div className={`w-full min-h-[100dvh] flex flex-col items-center px-4 pt-4 md:pt-8 lg:pt-12 ${theme.gradient} ${theme.text}`}>
      <Fireworks onInit={handleInit} />
      {showCongrats && (
        <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50">
          <div className="bg-white text-black rounded-2xl shadow-xl p-8 text-center max-w-sm w-full">
            <h2 className="text-2xl font-bold mb-4">🎉 Tebrikler! 🎉</h2>
            <p className="mb-6 text-lg italic text-gray-700">Doğru cevabı seçeceğini biliyordum 😉</p>
            {/* <button onClick={() => setShowCongrats(false)} className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600 transition">
              Devam Et
            </button> */}
          </div>
        </div>
      )}
      <h1 className="mb-2 md:mb-4 lg:mb-6 text-xl md:text-3xl lg:text-5xl font-semibold md:font-bold drop-shadow-lg">{survey.title}</h1>
      <QuestionContainer question={survey.questions[0]} onCorrect={handleCorrect} />
      <div className="flex-1" />
      <footer className="mt-8 text-center text-gray-500 text-sm w-full">
        Made by{' '}
        <a href="https://github.com/furkanisitan/yes-or-yes" target="_blank" rel="noopener noreferrer" className="underline hover:text-gray-700">
          Furkan Işıtan
        </a>
      </footer>
    </div>
  );
}
