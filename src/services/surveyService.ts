// services/surveyService.ts
import type { Survey } from '../models';
import httpClient from './httpClient';

const surveyService = {
  async getById(id: string): Promise<Survey | undefined> {
    const response = await httpClient.get<Survey>(`/surveys?id=${id}`);
    return response?.data;
  },
};

export default surveyService;
