import { useState, useEffect } from 'react';
import type { Survey } from '../../models';
import QuestionContainer from './QuestionContainer';
import { useParams } from 'react-router-dom';
import { surveyService } from '../../services';

const theme = {
  gradient: 'bg-gradient-to-tr from-orange-400 via-white to-yellow-300',
  text: 'text-red-600',
};

export default function SurveyContainer() {
  const { id } = useParams<{ id: string }>();
  const [survey, setSurvey] = useState<Survey | null>(null);

  useEffect(() => {
    async function fetchSurvey() {
      const data = await surveyService.getById(id!);
      if (data)
        setSurvey(data!);
    }
    if (id) fetchSurvey();
  }, [id]);

  if (!survey) return <></>;

  return (
    <div className={`w-full min-h-screen flex flex-col items-center px-4 pt-4 md:pt-8 lg:pt-12 ${theme.gradient} ${theme.text}`}>
      <h1 className="mb-2 md:mb-4 lg:mb-6 text-xl md:text-3xl lg:text-5xl font-semibold md:font-bold drop-shadow-lg">
        {survey.title}
      </h1>
      <QuestionContainer question={survey.questions[0]} />
    </div>
  );
}
