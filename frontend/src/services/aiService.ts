import apiClient from './apiClient';

import { API_ROUTES } from '@/constants/api';

export const askAI = async (query: string): Promise<string> => {
  const res = await apiClient.get<{ response: string }>(API_ROUTES.ASK_AI, {
    params: { query },
  });
  return res.data.response;
};
