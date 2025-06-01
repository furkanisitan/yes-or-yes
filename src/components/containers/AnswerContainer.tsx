import type { Answer } from "../../models";
import { EscapeBox } from "../boxes";

export type AnswerContainerProps = {
  answers: Answer[];
};

const AnswerContainer = ({ answers }: AnswerContainerProps) => {
  return (
    <div className="flex  flex-wrap justify-center gap-1 md:gap-2 lg:gap-4">
      {answers.map((answer) => (
        <EscapeBox key={answer.id} answer={answer} />
      ))}
    </div>
  );
};

export default AnswerContainer;
