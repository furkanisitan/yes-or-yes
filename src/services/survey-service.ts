// services/surveyService.ts
import type { Answer, Survey } from '../models';
import { UserHelper } from '../utils/helpers';
import httpClient from './http-client';

const surveyService = {
  async getById(id: string): Promise<Survey | undefined> {
    try {
      const response = await httpClient.get<Survey>(`/surveys?id=${id}`);
      return response?.data;
    } catch (error) {
      console.error('getById error:', error);
      return undefined;
    }
  },

  async addAnswerLog(surveyId: string, answer: Answer): Promise<void> {
    try {
      await this.addLog(surveyId, 'answer', {
        answerId: answer.id,
        type: answer.type,
        value: answer.value,
        isCorrect: answer.isCorrect,
      });
    } catch (error) {
      console.error('addAnswerLog error:', error);
    }
  },

  async addLog(surveyId: string, eventType: 'load' | 'answer', payload?: Record<string, any>): Promise<void> {
    try {
      const log = {
        surveyId,
        userId: UserHelper.getUserId(),
        eventType,
        ...(payload ? payload : {}),
      };
      await httpClient.post('/survey-logs', log);
    } catch (error) {
      console.error('addLog error:', error);
    }
  },
};

export default surveyService;
