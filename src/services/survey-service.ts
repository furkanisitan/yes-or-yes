// services/surveyService.ts
import type { Answer, Survey } from '../models';
import { UserHelper } from '../utils/helpers';
import httpClient from './http-client';

const surveyService = {
  async getById(id: string): Promise<Survey | undefined> {
    const response = await httpClient.get<Survey>(`/surveys?id=${id}`);
    return response?.data;
  },

  async addAnswerLog(surveyId: string, answer: Answer): Promise<void> {
    await this.addLog(surveyId, 'answer', {
      answerId: answer.id,
      type: answer.type,
      value: answer.value,
      isCorrect: answer.isCorrect,
    });
  },

  async addLog(surveyId: string, type: 'load' | 'answer', payload?: Record<string, any>): Promise<void> {
    const log = {
      surveyId,
      userId: UserHelper.getUserId(),
      type,
      ...(payload ? payload : {}),
    };
    await httpClient.post('/survey-logs', log);
  },
};

export default surveyService;
