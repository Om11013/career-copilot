import apiClient from './apiClient';

import { API_ROUTES } from '@/constants/api';

export interface OrchestratorPayload {
  user_query: string;
  resume_file?: File | null;
  resume_text?: string;
  resume_data?: unknown;
  job_description?: string;
}

export const callOrchestrator = async (payload: OrchestratorPayload) => {
  const formData = new FormData();
  formData.append('user_query', payload.user_query);

  if (payload.resume_file) {
    formData.append('resume_file', payload.resume_file);
  }
  if (payload.resume_text) {
    formData.append('resume_text', payload.resume_text);
  }
  if (payload.resume_data) {
    formData.append('resume_data', JSON.stringify(payload.resume_data));
  }
  if (payload.job_description) {
    formData.append('job_description', payload.job_description);
  }

  const response = await apiClient.post(API_ROUTES.ORCHESTRATE, formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });

  if (response.data?.error) {
    throw new Error(response.data.error);
  }

  return response.data;
};
