export interface AnalysisResult {
  summary?: string;
  experience?: string;
  skills?: Record<string, string[] | string>;
  strengths: string[];
  weaknesses: string[];
  suggestions: string[];
  score: number;
  error?: string;
  raw?: string;
}
