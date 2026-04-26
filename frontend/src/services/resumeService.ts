import apiClient from './apiClient';

import { API_ROUTES } from '@/constants/api';
import type { AnalysisResult } from '@/types/resume.types';

export const analyzeResume = async (
  resumeText: string,
  file: File | null,
): Promise<AnalysisResult> => {
  const formData = new FormData();

  if (file) {
    formData.append('file', file);
  }
  if (resumeText) {
    formData.append('resume', resumeText);
  }

  const res = await apiClient.post<AnalysisResult>(
    API_ROUTES.ANALYZE_RESUME,
    formData,
    {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    },
  );

  return res.data;
};
