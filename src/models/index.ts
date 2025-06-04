export interface Answer {
  id: number;
  type: 'text' | 'image';
  value: string;
  isCorrect: boolean;
  width: number;
  height: number;
  className?: string;
}

export interface Question {
  id: number;
  label: string;
  answers: Answer[];
  className?: string;
}

export interface Survey {
  title: string;
  questions: Question[];
  congratsTitle?: string;
  congratsText?: string;
  className?: string;
  titleClassName?: string;
}

export type Position = {
  x: number;
  y: number;
};

export type BoxSize = {
  width: number;
  height: number;
};
