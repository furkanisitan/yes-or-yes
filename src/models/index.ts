export interface Survey {
  title: string;
  congratsTitle?: string;
  congratsText?: string;
  theme: string;
  questions: Question[];
}

export interface Question {
  id: number;
  label: string;
  answers: Answer[];
  note?: string;
}

export interface Answer {
  id: number;
  type: 'text' | 'image';
  value: string;
  isCorrect: boolean;
  boxSize: BoxSize;
}

export interface BoxSize {
  width: number;
  height: number;
}

export interface Theme {
  survey: string;
  surveyTitle: string;
  question: string;
  answer: string;
  note: string
}

export type Position = {
  x: number;
  y: number;
}
