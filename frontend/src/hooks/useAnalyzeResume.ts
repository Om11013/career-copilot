import { useState, useCallback } from 'react';

import { analyzeResume as apiAnalyzeResume } from '@/services/resumeService';
import type { AnalysisResult } from '@/types/resume.types';
import { saveResumeToDB } from '@/utils/indexedDB';

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
        // Save to IndexedDB
        try {
          await saveResumeToDB(file, data);
        } catch (dbErr) {
          // eslint-disable-next-line no-console
          console.error('Failed to save to IndexedDB:', dbErr);
        }
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

  const clearResult = useCallback(() => {
    setResult(null);
    setError(null);
  }, []);

  const setResultData = useCallback((data: AnalysisResult | null) => {
    setResult(data);
  }, []);

  return {
    analyze,
    clearResult,
    result,
    loading,
    error,
    setResultData,
  };
}
