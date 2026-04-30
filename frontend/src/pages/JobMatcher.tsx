import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Briefcase,
  Target,
  CheckCircle2,
  AlertTriangle,
  Lightbulb,
} from 'lucide-react';

import { getResumeFromDB } from '@/utils/indexedDB';
import { matchJob } from '@/services/jobMatchService';
import type { JobMatchResponse } from '@/services/jobMatchService';
import { Badge } from '@/components/ui/badge';
import { InsightCard } from '@/components/feature/InsightCard';
import { LoaderSkeleton } from '@/components/feature/LoaderSkeleton';

export default function JobMatcher() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [analyzing, setAnalyzing] = useState(false);
  const [resumeData, setResumeData] = useState<Record<string, unknown> | null>(
    null,
  );
  const [jdText, setJdText] = useState('');
  const [result, setResult] = useState<JobMatchResponse | null>(null);
  const [error, setError] = useState<string | null>(null);

  const [isResumeMissing, setIsResumeMissing] = useState(false);

  useEffect(() => {
    const fetchResume = async () => {
      try {
        const data = await getResumeFromDB();
        if (!data || !data.parsedData) {
          setIsResumeMissing(true);
        } else {
          setResumeData(data.parsedData as Record<string, unknown>);
        }
      } catch (err) {
        // eslint-disable-next-line no-console
        console.error('Failed to fetch resume:', err);
        setIsResumeMissing(true);
      } finally {
        setLoading(false);
      }
    };
    fetchResume();
  }, []);

  const handleMatch = async () => {
    if (!jdText.trim() || !resumeData) return;
    setAnalyzing(true);
    setError(null);
    try {
      const matchResult = await matchJob({
        resume_data: resumeData,
        job_description: jdText,
      });
      setResult(matchResult);
    } catch (err) {
      // eslint-disable-next-line no-console
      console.error(err);
      setError('Failed to analyze job description. Please try again.');
    } finally {
      setAnalyzing(false);
    }
  };

  const getScoreColor = (score: number) => {
    if (score >= 80) return 'bg-[#829AB1] text-white';
    if (score >= 50) return 'bg-[#C97A5D] text-white';
    return 'bg-[#A86464] text-white';
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <LoaderSkeleton />
      </div>
    );
  }

  if (isResumeMissing) {
    return (
      <div className="min-h-full rounded-2xl p-4 md:p-8 overflow-hidden relative flex flex-col items-center justify-center mt-12">
        <div className="bg-white/60 backdrop-blur-md rounded-3xl p-12 shadow-sm border border-[#829AB1]/20 text-center max-w-xl mx-auto space-y-6">
          <AlertTriangle className="w-16 h-16 text-[#C97A5D] mx-auto opacity-80" />
          <h2 className="text-2xl font-bold text-[#4A4A4A]">Resume Needed</h2>
          <p className="text-[#5C5C5C] text-[15px] leading-relaxed">
            Please upload and analyze your resume first. The Job Matcher needs
            your parsed resume data to compare against job descriptions.
          </p>
          <button
            onClick={() => navigate('/resume-analyzer')}
            className="w-full py-3 px-4 bg-[#829AB1] hover:bg-[#829AB1]/90 text-white rounded-xl font-medium transition-colors"
          >
            Go to Resume Analyzer
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-full rounded-2xl p-4 md:p-8 overflow-hidden relative">
      <div className="relative z-10 max-w-7xl mx-auto space-y-8">
        <div className="flex flex-col items-center text-center space-y-4 mb-8">
          <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-[#829AB1]/10 text-[#829AB1] text-sm font-medium mb-2 border border-[#829AB1]/20">
            <Target className="w-4 h-4" />
            <span>AI Job Matcher</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight text-[#4A4A4A]">
            Job Matching Agent
          </h1>
          <p className="text-lg text-[#5C5C5C] max-w-2xl">
            Paste a Job Description to see how well your resume matches and get
            actionable insights.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          <div className="lg:col-span-5 space-y-6">
            <div className="bg-white/60 backdrop-blur-md rounded-3xl p-6 shadow-sm border border-[#829AB1]/20 sticky top-8">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-semibold text-[#4A4A4A] flex items-center gap-2">
                  <Briefcase className="w-5 h-5 text-[#829AB1]" />
                  Job Description
                </h2>
              </div>

              <div className="space-y-6">
                <textarea
                  className="w-full min-h-[300px] p-4 rounded-xl border border-[#829AB1]/20 bg-white/50 focus:outline-none focus:ring-2 focus:ring-[#829AB1]/50 resize-none transition-all"
                  placeholder="Paste the job description here..."
                  value={jdText}
                  onChange={(e) => setJdText(e.target.value)}
                  disabled={analyzing}
                />

                {error && (
                  <div className="p-4 rounded-xl bg-[#A86464]/10 border border-[#A86464]/20 flex items-start gap-3 text-[#A86464] text-sm">
                    <AlertTriangle className="w-5 h-5 shrink-0" />
                    <p>{error}</p>
                  </div>
                )}

                <button
                  onClick={handleMatch}
                  disabled={!jdText.trim() || analyzing}
                  className="w-full py-3 px-4 bg-[#829AB1] hover:bg-[#829AB1]/90 text-white rounded-xl font-medium transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                >
                  {analyzing ? (
                    <>
                      <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                      Analyzing...
                    </>
                  ) : (
                    <>
                      <Target className="w-5 h-5" />
                      Match Job
                    </>
                  )}
                </button>
              </div>
            </div>
          </div>

          <div className="lg:col-span-7">
            {analyzing && (
              <div className="bg-white/40 rounded-3xl border border-[#829AB1]/10 h-full min-h-[600px] flex items-center justify-center">
                <LoaderSkeleton />
              </div>
            )}

            {!analyzing && !result && (
              <div className="bg-white/30 rounded-3xl border border-[#829AB1]/10 h-full min-h-[600px] flex flex-col items-center justify-center text-[#829AB1] border-dashed p-12 text-center">
                <Briefcase className="w-16 h-16 mb-4 opacity-50" />
                <h3 className="text-xl font-medium text-[#4A4A4A]">
                  Ready to Match
                </h3>
                <p className="mt-2 text-sm max-w-sm">
                  Paste a JD and click Match Job to get your personalized score
                  and insights.
                </p>
              </div>
            )}

            {result && !analyzing && (
              <div className="space-y-6">
                <InsightCard
                  icon={<Target className="w-5 h-5" />}
                  title="Match Score"
                  className="text-center"
                >
                  <div
                    className={`mt-4 mx-auto relative inline-flex items-center justify-center w-32 h-32 rounded-full ${getScoreColor(result.match_score)} shadow-sm`}
                  >
                    <div className="flex flex-col items-center justify-center">
                      <span className="text-4xl font-black">
                        {result.match_score}
                      </span>
                      <span className="text-xs font-medium tracking-widest mt-1 opacity-80">
                        %
                      </span>
                    </div>
                  </div>
                </InsightCard>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <InsightCard
                    title="Matched Skills"
                    className="border-[#829AB1]/30"
                  >
                    {result.matched_skills.length > 0 ? (
                      <div className="flex flex-wrap gap-2">
                        {result.matched_skills.map((skill, i) => (
                          <Badge
                            key={i}
                            variant="secondary"
                            className="bg-[#829AB1]/10 text-[#829AB1] border border-[#829AB1]/20"
                          >
                            <CheckCircle2 className="w-3 h-3 mr-1 inline-block" />
                            {skill}
                          </Badge>
                        ))}
                      </div>
                    ) : (
                      <p className="italic text-sm text-gray-500">
                        No matched skills found
                      </p>
                    )}
                  </InsightCard>

                  <InsightCard
                    title="Missing Skills"
                    className="border-[#A86464]/30"
                  >
                    {result.missing_skills.length > 0 ? (
                      <div className="flex flex-wrap gap-2">
                        {result.missing_skills.map((skill, i) => (
                          <Badge
                            key={i}
                            variant="secondary"
                            className="bg-[#A86464]/10 text-[#A86464] border border-[#A86464]/20"
                          >
                            <AlertTriangle className="w-3 h-3 mr-1 inline-block" />
                            {skill}
                          </Badge>
                        ))}
                      </div>
                    ) : (
                      <p className="italic text-sm text-gray-500">
                        No missing skills found
                      </p>
                    )}
                  </InsightCard>
                </div>

                <InsightCard
                  title="AI Insight"
                  icon={<Lightbulb className="w-5 h-5" />}
                  className="bg-white"
                >
                  <p className="leading-relaxed whitespace-pre-wrap text-[15px]">
                    {result.insight}
                  </p>
                </InsightCard>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
