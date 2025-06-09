import { createContext, useContext } from 'react';
import type { Theme } from '../models';

type SurveyContextType = {
  surveyId: string;
  theme: Theme;
};

export const SurveyContext = createContext<SurveyContextType | null>(null);

export function useSurveyContext() {
  const ctx = useContext(SurveyContext);
  if (!ctx) throw new Error('useSurveyContext must be used within SurveyContext');
  return ctx;
}
