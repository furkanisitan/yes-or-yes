import type { Answer } from "../../models";
import { EscapeBox } from "../boxes";

export type AnswerContainerProps = {
  answers: Answer[];
};

const AnswerContainer = ({ answers }: AnswerContainerProps) => {
  return (
    <div className="flex justify-center gap-4 flex-wrap">
      {answers.map((answer) => (
        <EscapeBox key={answer.id} answer={answer} />
      ))}
    </div>
  );
};

export default AnswerContainer;
