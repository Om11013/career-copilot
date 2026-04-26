import { useState } from 'react';
import { Loader2 } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { analyzeResume } from '@/service/resume';

interface AnalysisResult {
  score: number;
  strengths: string[];
  weaknesses: string[];
  suggestions: string[];
  error?: string;
  raw?: string;
}

export default function ResumeAnalyzer() {
  const [resumeText, setResumeText] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [result, setResult] = useState<AnalysisResult | null>(null);

  const handleAnalyze = async () => {
    if (!resumeText.trim()) return;

    setLoading(true);
    setError(null);
    setResult(null);

    try {
      const data = await analyzeResume(resumeText);
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

  const getScoreColor = (score: number) => {
    if (score >= 8) return 'bg-green-500 hover:bg-green-600';
    if (score >= 5) return 'bg-yellow-500 hover:bg-yellow-600';
    return 'bg-red-500 hover:bg-red-600';
  };

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold tracking-tight text-zinc-900">
          Resume Analyzer
        </h1>
        <p className="mt-2 text-zinc-500">
          Paste your resume below to get instant AI-powered feedback, score, and
          suggestions.
        </p>
      </div>

      <Card>
        <CardContent className="pt-6 space-y-4">
          <Textarea
            placeholder="Paste your resume content here..."
            className="min-h-[200px] resize-y"
            value={resumeText}
            onChange={(e) => setResumeText(e.target.value)}
            disabled={loading}
          />
          <div className="flex justify-end">
            <Button
              onClick={handleAnalyze}
              disabled={loading || !resumeText.trim()}
            >
              {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              {loading ? 'Analyzing...' : 'Analyze Resume'}
            </Button>
          </div>
          {error && <p className="text-sm font-medium text-red-500">{error}</p>}
        </CardContent>
      </Card>

      {result && (
        <div className="grid gap-6 md:grid-cols-2">
          <Card className="md:col-span-2">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <div className="space-y-1">
                <CardTitle>Overall Score</CardTitle>
                <CardDescription>Based on industry standards</CardDescription>
              </div>
              <Badge
                className={`text-lg px-4 py-1 text-white ${getScoreColor(result.score)}`}
              >
                {result.score} / 10
              </Badge>
            </CardHeader>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-green-600">Strengths</CardTitle>
            </CardHeader>
            <CardContent>
              {result.strengths?.length > 0 ? (
                <ul className="list-disc pl-5 space-y-1 text-zinc-700">
                  {result.strengths.map((s, i) => (
                    <li key={i}>{s}</li>
                  ))}
                </ul>
              ) : (
                <p className="text-zinc-500 italic">
                  No specific strengths identified.
                </p>
              )}
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-red-600">Weaknesses</CardTitle>
            </CardHeader>
            <CardContent>
              {result.weaknesses?.length > 0 ? (
                <ul className="list-disc pl-5 space-y-1 text-zinc-700">
                  {result.weaknesses.map((w, i) => (
                    <li key={i}>{w}</li>
                  ))}
                </ul>
              ) : (
                <p className="text-zinc-500 italic">
                  No specific weaknesses identified.
                </p>
              )}
            </CardContent>
          </Card>

          <Card className="md:col-span-2">
            <CardHeader>
              <CardTitle className="text-blue-600">
                Suggestions for Improvement
              </CardTitle>
            </CardHeader>
            <CardContent>
              {result.suggestions?.length > 0 ? (
                <ul className="list-disc pl-5 space-y-1 text-zinc-700">
                  {result.suggestions.map((s, i) => (
                    <li key={i}>{s}</li>
                  ))}
                </ul>
              ) : (
                <p className="text-zinc-500 italic">No specific suggestions.</p>
              )}
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
}
