import { useState } from 'react';
import { Loader2, UploadCloud, FileText } from 'lucide-react';

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
  summary?: string;
  experience?: string;
  skills?: Record<string, string[]>;
  strengths: string[];
  weaknesses: string[];
  suggestions: string[];
  score: number;
  error?: string;
  raw?: string;
}

export default function ResumeAnalyzer() {
  const [resumeText, setResumeText] = useState('');
  const [file, setFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [result, setResult] = useState<AnalysisResult | null>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setFile(e.target.files[0]);
    }
  };

  const handleAnalyze = async () => {
    if (!resumeText.trim() && !file) return;

    setLoading(true);
    setError(null);
    setResult(null);

    try {
      const data = await analyzeResume(resumeText, file);
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
          Upload a PDF or paste your resume text to get detailed, structured AI
          feedback.
        </p>
      </div>

      <Card>
        <CardContent className="pt-6 space-y-6">
          <div className="flex flex-col gap-4 p-6 border-2 border-dashed border-zinc-200 rounded-lg bg-zinc-50 items-center justify-center text-center">
            <UploadCloud className="h-10 w-10 text-zinc-400" />
            <div className="space-y-1">
              <p className="text-sm font-medium text-zinc-700">
                Upload PDF Resume (Preferred)
              </p>
              <p className="text-xs text-zinc-500">
                Our parser preserves formatting and layout.
              </p>
            </div>
            <input
              type="file"
              accept=".pdf"
              onChange={handleFileChange}
              className="text-sm text-zinc-600 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-zinc-100 file:text-zinc-700 hover:file:bg-zinc-200"
              disabled={loading}
            />
          </div>

          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <span className="w-full border-t border-zinc-200" />
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-white px-2 text-zinc-500">Or Paste Text</span>
            </div>
          </div>

          <Textarea
            placeholder="Paste your plain text resume here..."
            className="min-h-[150px] resize-y"
            value={resumeText}
            onChange={(e) => setResumeText(e.target.value)}
            disabled={loading}
          />

          <div className="flex justify-end">
            <Button
              onClick={handleAnalyze}
              disabled={loading || (!resumeText.trim() && !file)}
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
          {/* Top Level Overview */}
          <div className="md:col-span-2 flex flex-col md:flex-row gap-6">
            <Card className="flex-1">
              <CardHeader className="pb-2">
                <CardTitle className="flex items-center gap-2">
                  <FileText className="h-5 w-5 text-indigo-600" />
                  Professional Summary
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-zinc-700 leading-relaxed">
                  {result.summary || 'Not found'}
                </p>
              </CardContent>
            </Card>

            <Card className="md:w-64 flex flex-col justify-center text-center">
              <CardHeader className="pb-2">
                <CardTitle className="text-zinc-500">Resume Score</CardTitle>
              </CardHeader>
              <CardContent>
                <Badge
                  className={`text-2xl px-6 py-2 text-white ${getScoreColor(result.score || 0)}`}
                >
                  {result.score ? `${result.score} / 10` : 'N/A'}
                </Badge>
              </CardContent>
            </Card>
          </div>

          {/* Strengths & Weaknesses */}
          <Card>
            <CardHeader>
              <CardTitle className="text-green-600">Key Strengths</CardTitle>
            </CardHeader>
            <CardContent>
              {result.strengths?.length > 0 ? (
                <ul className="list-disc pl-5 space-y-1 text-zinc-700">
                  {result.strengths.map((s, i) => (
                    <li key={i}>{s}</li>
                  ))}
                </ul>
              ) : (
                <p className="text-zinc-500 italic">Not found</p>
              )}
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-red-600">Weaknesses & Gaps</CardTitle>
            </CardHeader>
            <CardContent>
              {result.weaknesses?.length > 0 ? (
                <ul className="list-disc pl-5 space-y-1 text-zinc-700">
                  {result.weaknesses.map((w, i) => (
                    <li key={i}>{w}</li>
                  ))}
                </ul>
              ) : (
                <p className="text-zinc-500 italic">Not found</p>
              )}
            </CardContent>
          </Card>

          {/* Experience Analysis */}
          <Card className="md:col-span-2">
            <CardHeader>
              <CardTitle className="text-indigo-600">
                Experience Analysis
              </CardTitle>
              <CardDescription>
                Role progression, impact, and relevance
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-zinc-700 whitespace-pre-wrap">
                {result.experience || 'Not found'}
              </p>
            </CardContent>
          </Card>

          {/* Categorized Skills */}
          <Card className="md:col-span-2">
            <CardHeader>
              <CardTitle className="text-amber-600">Extracted Skills</CardTitle>
            </CardHeader>
            <CardContent>
              {result.skills && Object.keys(result.skills).length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                  {Object.entries(result.skills).map(([category, items]) => (
                    <div key={category} className="space-y-2">
                      <h4 className="font-medium text-zinc-900 border-b pb-1">
                        {category}
                      </h4>
                      <div className="flex flex-wrap gap-2">
                        {Array.isArray(items) ? (
                          items.map((skill, i) => (
                            <Badge
                              key={i}
                              variant="secondary"
                              className="bg-zinc-100 hover:bg-zinc-200 text-zinc-700"
                            >
                              {skill}
                            </Badge>
                          ))
                        ) : (
                          <span className="text-sm text-zinc-500">
                            {String(items)}
                          </span>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-zinc-500 italic">Not found</p>
              )}
            </CardContent>
          </Card>

          {/* Actionable Suggestions */}
          <Card className="md:col-span-2 border-indigo-100 bg-indigo-50/30">
            <CardHeader>
              <CardTitle className="text-indigo-700">
                Actionable Suggestions
              </CardTitle>
            </CardHeader>
            <CardContent>
              {result.suggestions?.length > 0 ? (
                <ul className="list-disc pl-5 space-y-2 text-indigo-900/80">
                  {result.suggestions.map((s, i) => (
                    <li key={i}>{s}</li>
                  ))}
                </ul>
              ) : (
                <p className="text-zinc-500 italic">Not found</p>
              )}
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
}
