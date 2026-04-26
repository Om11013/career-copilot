import React, { useState, useRef, useEffect } from 'react';
import {
  FileText,
  Target,
  Activity,
  Lightbulb,
  CheckCircle2,
  AlertTriangle,
} from 'lucide-react';

import { Badge } from '@/components/ui/badge';
import { analyzeResume } from '@/service/resume';
import { UploadCard } from '@/components/resume/UploadCard';
import { TextareaInput } from '@/components/resume/TextareaInput';
import { AnalyzeButton } from '@/components/resume/AnalyzeButton';
import { InsightCard } from '@/components/resume/InsightCard';
import { LoaderSkeleton } from '@/components/resume/LoaderSkeleton';

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

  const resultsRef = useRef<HTMLDivElement>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setFile(e.target.files[0]);
      setResult(null); // Clear previous results when input changes
    }
  };

  const handleTextChange = (val: string) => {
    setResumeText(val);
    setResult(null); // Clear previous results when input changes
  };

  const handleClearFile = () => {
    setFile(null);
    setResult(null);
  };

  const handleClearText = () => {
    setResumeText('');
    setResult(null);
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

  // Scroll to results when they appear on mobile
  useEffect(() => {
    if (result && resultsRef.current && window.innerWidth < 1024) {
      resultsRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }, [result]);

  const getScoreColor = (score: number) => {
    if (score >= 8) return 'bg-[#829AB1] text-white'; // Faded Denim
    if (score >= 5) return 'bg-[#C97A5D] text-white'; // Suede
    return 'bg-[#A86464] text-white'; // Soft red
  };

  return (
    <div className="min-h-full rounded-2xl p-4 md:p-8 overflow-hidden relative">
      <div className="relative z-10 max-w-7xl mx-auto space-y-8">
        {/* Header */}
        <div className="flex flex-col items-center text-center space-y-4 mb-8">
          <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-[#829AB1]/10 text-[#829AB1] text-sm font-medium mb-2 border border-[#829AB1]/20">
            <SparklesIcon className="w-4 h-4" />
            <span>AI-Powered Analysis</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight text-[#4A4A4A]">
            Resume Analyzer
          </h1>
          <p className="text-lg text-[#5C5C5C] max-w-2xl">
            Upload your resume to get instant, beautifully structured feedback
            and optimize your career trajectory.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* LEFT COLUMN: INPUTS */}
          <div className="lg:col-span-5 space-y-6">
            <div className="bg-white/60 backdrop-blur-md rounded-3xl p-6 shadow-sm border border-[#829AB1]/20 sticky top-8">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-semibold text-[#4A4A4A] flex items-center gap-2">
                  <FileText className="w-5 h-5 text-[#829AB1]" />
                  Input Source
                </h2>
              </div>

              <div className="space-y-6">
                <UploadCard
                  file={file}
                  onFileChange={handleFileChange}
                  onClear={handleClearFile}
                  disabled={loading || !!resumeText.trim()} // Disabled if text is populated
                />

                <div className="relative flex items-center py-2">
                  <div className="grow border-t border-[#829AB1]/20" />
                  <span className="shrink-0 mx-4 text-xs uppercase tracking-widest text-[#829AB1] font-semibold">
                    Or
                  </span>
                  <div className="grow border-t border-[#829AB1]/20" />
                </div>

                <TextareaInput
                  value={resumeText}
                  onChange={handleTextChange}
                  onClear={handleClearText}
                  disabled={loading || !!file} // Disabled if file is populated
                />

                {error && (
                  <div className="p-4 rounded-xl bg-[#A86464]/10 border border-[#A86464]/20 flex items-start gap-3 text-[#A86464] text-sm">
                    <AlertTriangle className="w-5 h-5 shrink-0" />
                    <p>{error}</p>
                  </div>
                )}

                <AnalyzeButton
                  onClick={handleAnalyze}
                  loading={loading}
                  disabled={(!file && !resumeText.trim()) || !!result} // Disabled if empty OR result already generated
                />
              </div>
            </div>
          </div>

          {/* RIGHT COLUMN: OUTPUTS */}
          <div className="lg:col-span-7" ref={resultsRef}>
            {loading && (
              <div className="bg-white/40 rounded-3xl border border-[#829AB1]/10 h-full min-h-[600px] flex items-center justify-center">
                <LoaderSkeleton />
              </div>
            )}

            {!loading && !result && (
              <div className="bg-white/30 rounded-3xl border border-[#829AB1]/10 h-full min-h-[600px] flex flex-col items-center justify-center text-[#829AB1] border-dashed p-12 text-center">
                <Target className="w-16 h-16 mb-4 opacity-50" />
                <h3 className="text-xl font-medium text-[#4A4A4A]">
                  Ready for Analysis
                </h3>
                <p className="mt-2 text-sm max-w-sm">
                  Upload your resume on the left and click Analyze to generate
                  your insights here.
                </p>
              </div>
            )}

            {result && !loading && (
              <div className="space-y-6">
                {/* Score & Summary Row */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {/* Score Card */}
                  <div className="md:col-span-1">
                    <InsightCard
                      icon={<FileText className="w-5 h-5" />}
                      title="Score"
                      className="h-ful flex flex-col justify-center text-center"
                      delay={100}
                    >
                      <div
                        className={`mt-4 relative inline-flex items-center justify-center w-32 h-32 rounded-full ${getScoreColor(result.score || 0)} shadow-sm`}
                      >
                        <div className="flex flex-col items-center justify-center">
                          <span className="text-4xl font-black">
                            {result.score || 0}
                          </span>
                          <span className="text-xs font-medium tracking-widest mt-1 opacity-80">
                            / 10
                          </span>
                        </div>
                      </div>
                    </InsightCard>
                  </div>

                  {/* Summary Card */}
                  <div className="md:col-span-2">
                    <InsightCard
                      title="Professional Summary"
                      icon={<FileText className="w-5 h-5" />}
                      className="h-full"
                      delay={200}
                    >
                      <p className="leading-relaxed text-[15px]">
                        {result.summary || 'Not found'}
                      </p>
                    </InsightCard>
                  </div>
                </div>

                {/* Experience */}
                <InsightCard
                  title="Experience Analysis"
                  icon={<Activity className="w-5 h-5" />}
                  delay={300}
                >
                  <p className="leading-relaxed whitespace-pre-wrap text-[15px]">
                    {result.experience || 'Not found'}
                  </p>
                </InsightCard>

                {/* Skills Grid */}
                <InsightCard
                  title="Extracted Skills"
                  icon={<Target className="w-5 h-5" />}
                  delay={400}
                >
                  {result.skills && Object.keys(result.skills).length > 0 ? (
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                      {Object.entries(result.skills).map(
                        ([category, items]) => (
                          <div
                            key={category}
                            className="space-y-3 bg-white/50 p-4 rounded-xl border border-[#829AB1]/10"
                          >
                            <h4 className="text-sm font-semibold text-[#829AB1] uppercase tracking-wider">
                              {category}
                            </h4>
                            <div className="flex flex-wrap gap-2">
                              {Array.isArray(items) ? (
                                items.map((skill, i) => (
                                  <Badge
                                    key={i}
                                    variant="secondary"
                                    className="bg-[#FAF7F5] hover:bg-[#F3E9E0] text-[#4A4A4A] border border-[#829AB1]/20 transition-colors"
                                  >
                                    {skill}
                                  </Badge>
                                ))
                              ) : (
                                <span className="text-sm">{String(items)}</span>
                              )}
                            </div>
                          </div>
                        ),
                      )}
                    </div>
                  ) : (
                    <p className="italic">Not found</p>
                  )}
                </InsightCard>

                {/* Strengths & Weaknesses */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <InsightCard
                    title="Key Strengths"
                    delay={500}
                    className="border-[#829AB1]/30"
                  >
                    {result.strengths?.length > 0 ? (
                      <ul className="space-y-3">
                        {result.strengths.map((s, i) => (
                          <li
                            key={i}
                            className="flex items-start gap-3 text-[15px]"
                          >
                            <CheckCircle2 className="w-5 h-5 text-[#829AB1] shrink-0 mt-0.5" />
                            <span>{s}</span>
                          </li>
                        ))}
                      </ul>
                    ) : (
                      <p className="italic">Not found</p>
                    )}
                  </InsightCard>

                  <InsightCard
                    title="Weaknesses & Gaps"
                    delay={600}
                    className="border-[#C97A5D]/30"
                  >
                    {result.weaknesses?.length > 0 ? (
                      <ul className="space-y-3">
                        {result.weaknesses.map((w, i) => (
                          <li
                            key={i}
                            className="flex items-start gap-3 text-[15px]"
                          >
                            <AlertTriangle className="w-5 h-5 text-[#C97A5D] shrink-0 mt-0.5" />
                            <span>{w}</span>
                          </li>
                        ))}
                      </ul>
                    ) : (
                      <p className="italic">Not found</p>
                    )}
                  </InsightCard>
                </div>

                {/* Suggestions */}
                <InsightCard
                  title="Actionable Suggestions"
                  icon={<Lightbulb className="w-5 h-5" />}
                  className="bg-white"
                  delay={700}
                >
                  {result.suggestions?.length > 0 ? (
                    <ul className="space-y-4">
                      {result.suggestions.map((s, i) => (
                        <li
                          key={i}
                          className="flex items-start gap-4 bg-[#FAF7F5] p-4 rounded-xl border border-[#829AB1]/10"
                        >
                          <div className="shrink-0 w-8 h-8 rounded-full bg-[#829AB1]/10 flex items-center justify-center text-[#829AB1] font-bold text-sm">
                            {i + 1}
                          </div>
                          <span className="text-[15px] pt-1 leading-relaxed">
                            {s}
                          </span>
                        </li>
                      ))}
                    </ul>
                  ) : (
                    <p className="italic">Not found</p>
                  )}
                </InsightCard>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

// Minimal icon component to avoid extra imports
function SparklesIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <path d="m12 3-1.912 5.813a2 2 0 0 1-1.275 1.275L3 12l5.813 1.912a2 2 0 0 1 1.275 1.275L12 21l1.912-5.813a2 2 0 0 1 1.275-1.275L21 12l-5.813-1.912a2 2 0 0 1-1.275-1.275L12 3Z" />
      <path d="M5 3v4" />
      <path d="M19 17v4" />
      <path d="M3 5h4" />
      <path d="M17 19h4" />
    </svg>
  );
}
