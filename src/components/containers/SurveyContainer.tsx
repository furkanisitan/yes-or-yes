import React from "react";

type SurveyContainerProps = {
  children: React.ReactNode;
};

export default function SurveyContainer({ children }: SurveyContainerProps) {
  return (
    <div className="w-full min-h-screen flex flex-col items-center bg-gradient-to-tr from-yellow-300 via-orange-400 to-red-400 text-white px-4 pt-12">
      <h1 className="text-5xl font-extrabold mb-6 drop-shadow-lg">🎲 Eğlenceli Quiz 🎲</h1>
      {children}
    </div>
  );
}
