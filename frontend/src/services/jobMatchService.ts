import apiClient from './apiClient';

import { API_ROUTES } from '@/constants/api';

export interface JobMatchRequest {
  resume_data: Record<string, unknown>;
  job_description: string;
}

export interface JobMatchResponse {
  match_score: number;
  matched_skills: string[];
  missing_skills: string[];
  insight: string;
}

export const matchJob = async (
  data: JobMatchRequest,
): Promise<JobMatchResponse> => {
  const res = await apiClient.post<JobMatchResponse>(
    API_ROUTES.MATCH_JOB,
    data,
  );
  return res.data;
};
