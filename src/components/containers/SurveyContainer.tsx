import { useState, useEffect, useRef } from 'react';
import type { Survey } from '../../models';
import QuestionContainer from './QuestionContainer';
import { useParams } from 'react-router-dom';
import { surveyService } from '../../services';
import Fireworks from 'react-canvas-confetti/dist/presets/fireworks';
import { SurveyContext } from '../../contexts/SurveyContext';
import { themes } from '../../themes';
import SurveyNotFound from '../pages/SurveyNotFound';

export default function SurveyContainer() {
  const { id } = useParams<{ id: string }>();
  const [survey, setSurvey] = useState<Survey | null>(null);
  const [loading, setLoading] = useState(true); // loading state
  const [showCongrats, setShowCongrats] = useState(false);

  const fireworksController = useRef<any>(null);

  useEffect(() => {
    async function fetchSurvey() {
      setLoading(true);
      const data = await surveyService.getById(id!);
      setSurvey(data ?? null);
      setLoading(false);
    }
    if (id) fetchSurvey();
  }, [id]);

  useEffect(() => {
    if (survey) surveyService.addLog(id!, 'load');
  }, [survey]);

  useEffect(() => {
    if (showCongrats) fireworksController.current?.run({ speed: 3 });
    else fireworksController.current?.pause();
  }, [showCongrats]);

  function handleCorrect() {
    setShowCongrats(true);
  }

  const handleInit = ({ conductor }: any) => {
    fireworksController.current = conductor;
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-black bg-opacity-60">
        <span className="text-white text-lg">Yükleniyor...</span>
      </div>
    );
  }

  if (!survey) return <SurveyNotFound />;

  const theme = themes[survey.theme || 'default'] || themes['default'];

  return (
    <SurveyContext value={{ surveyId: id!, theme }}>
      <div className={`w-full min-h-[100dvh] flex flex-col items-center px-4 pt-4 md:pt-8 lg:pt-12 ${theme.survey}`}>
        <Fireworks onInit={handleInit} />
        {showCongrats && (
          <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50">
            <div className="bg-white text-black rounded-2xl shadow-xl p-8 text-center max-w-sm w-full">
              <h2 className="text-lg md:text-2xl font-bold mb-4">{survey.congratsTitle || '🎉 Tebrikler! 🎉'}</h2>
              <p className="mb-6 text-lg italic text-gray-700">{survey.congratsText || 'Doğru cevabı seçeceğini biliyordum 😉'}</p>
            </div>
          </div>
        )}
        <h1 className={`mb-4 md:mb-6 lg:mb-8 text-xl md:text-3xl lg:text-5xl drop-shadow-lg ${theme.surveyTitle}`}>{survey.title}</h1>
        <QuestionContainer question={survey.questions[0]} onCorrect={handleCorrect} />
        <div className="flex-1" />
        <footer className="mt-8 text-center text-gray-500 text-sm w-full">
          Made by{' '}
          <a href="https://github.com/furkanisitan/yes-or-yes" target="_blank" rel="noopener noreferrer" className="underline hover:text-gray-700">
            Furkan Işıtan
          </a>
        </footer>
      </div>
    </SurveyContext>
  );
}
