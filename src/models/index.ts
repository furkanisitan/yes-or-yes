export interface Answer {
    id: number;
    label: string;
    isCorrect: boolean;
    width?: string | number;
    height?: string | number;
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