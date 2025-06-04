// services/surveyService.ts
import type { Survey } from '../models';
import { UserHelper } from '../utils/helpers';
import httpClient from './http-client';

const surveyService = {
  async getById(id: string): Promise<Survey | undefined> {
    const response = await httpClient.get<Survey>(`/surveys?id=${id}`);
    return response?.data;
  },

  async addLog(surveyId: string, type: 'login' | 'correct') {
    const log = {
      surveyId,
      userId: UserHelper.getUserId(),
      type,
    };
    const response = await httpClient.post('/survey-logs', log);
    return response.data;
  },
};

export default surveyService;
