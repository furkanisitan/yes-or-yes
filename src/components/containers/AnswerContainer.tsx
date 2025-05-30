import React from "react";

type AnswerContainerProps = {
  children: React.ReactNode;
};

export default function AnswerContainer({ children }: AnswerContainerProps) {
  return <div className="flex justify-center gap-4 flex-wrap">{children}</div>;
}
