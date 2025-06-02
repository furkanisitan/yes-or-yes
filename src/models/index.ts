export interface Answer {
  id: number;
  type: 'text' | 'image';
  value: string;
  isCorrect: boolean;
  width: number;
  height: number;
}

export interface Question {
  id: number;
  label: string;
  answers: Answer[];
}

export interface Survey {
  title: string;
  questions: Question[];
}

export type Position = {
  x: number;
  y: number;
};

export type BoxSize = {
  width: number;
  height: number;
};
