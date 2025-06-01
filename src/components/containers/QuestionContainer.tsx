import type { Question } from "../../models";
import AnswerContainer from "./AnswerContainer";

export type QuestionContainerProps = {
  question: Question;
};

export default function QuestionContainer({ question }: QuestionContainerProps) {
  return (
    <>
      <div className="mb-6 md:mb-8 lg:mb-10 text-base md:text-xl lg:text-3xl font-semibold drop-shadow-md">{question.label}</div>
      <AnswerContainer key={question.id} answers={question.answers} />
    </>
  );
}
