import type { Question } from '../../models';
import AnswerContainer from './AnswerContainer';
import { useSurveyContext } from '../../contexts/SurveyContext';

export type QuestionContainerProps = {
  question: Question;
  onCorrect: () => void;
};

export default function QuestionContainer({ question, onCorrect }: QuestionContainerProps) {
  const { theme } = useSurveyContext();

  return (
    <>
      <div className={`mb-6 md:mb-8 lg:mb-10 text-base md:text-xl lg:text-3xl drop-shadow-md text-center ${theme.question}`}>{question.label}</div>
      <AnswerContainer key={question.id} answers={question.answers} onCorrect={onCorrect} />
    </>
  );
}
