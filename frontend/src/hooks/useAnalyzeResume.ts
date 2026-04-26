import { useState } from 'react';

import { analyzeResume as apiAnalyzeResume } from '@/services/resumeService';
import type { AnalysisResult } from '@/types/resume.types';

export function useAnalyzeResume() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [result, setResult] = useState<AnalysisResult | null>(null);

  const analyze = async (resumeText: string, file: File | null) => {
    if (!resumeText.trim() && !file) return;

    setLoading(true);
    setError(null);
    setResult(null);

    try {
      const data = await apiAnalyzeResume(resumeText, file);
      if (data.error) {
        setError(data.error);
      } else {
        setResult(data);
      }
    } catch (err) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError('Failed to connect to the backend.');
      }
    } finally {
      setLoading(false);
    }
  };

  const clearResult = () => {
    setResult(null);
    setError(null);
  };

  return {
    analyze,
    clearResult,
    result,
    loading,
    error,
  };
}
