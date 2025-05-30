import React from "react";

type QuestionContainerProps = {
  children: React.ReactNode;
};

export default function QuestionContainer({ children }: QuestionContainerProps) {
  return (
    <div className="w-full max-w-5xl text-center mt-4">
      <div className="mb-2 text-lg opacity-90">Soru 1 / 3</div>
      <div className="mb-6 text-3xl font-semibold drop-shadow-md">En sevdiğin renk hangisi?</div>
      {children}
    </div>
  );
}
