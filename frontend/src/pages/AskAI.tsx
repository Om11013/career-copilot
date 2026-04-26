import { useState } from 'react';
import { Loader2, Send, BotMessageSquare } from 'lucide-react';

import { askAI } from '@/service/ai';
import { InsightCard } from '@/components/resume/InsightCard';

export default function AskAI() {
  const [query, setQuery] = useState('');
  const [loading, setLoading] = useState(false);
  const [response, setResponse] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleAsk = async () => {
    if (!query.trim()) return;

    setLoading(true);
    setError(null);
    setResponse(null);

    try {
      const res = await askAI(query);
      setResponse(res);
    } catch (err) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError('Failed to connect to the AI backend.');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-8 max-w-4xl mx-auto h-full flex flex-col">
      <div className="text-center space-y-4 mb-4">
        <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-[#829AB1]/10 border border-[#829AB1]/20 text-[#829AB1] text-sm font-medium mb-2">
          <BotMessageSquare className="w-4 h-4" />
          <span>Ask Career Copilot</span>
        </div>
        <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight text-[#4A4A4A]">
          AI Career Assistant
        </h1>
        <p className="mt-2 text-[#5C5C5C] max-w-xl mx-auto text-lg">
          Ask any career, interview, or resume-related questions in a calm,
          focused environment.
        </p>
      </div>

      <div className="bg-[#FAF7F5] border border-[#829AB1]/20 rounded-3xl p-2 shadow-sm relative overflow-hidden group focus-within:border-[#C97A5D]/50 focus-within:ring-1 focus-within:ring-[#C97A5D]/50 transition-all duration-300">
        <textarea
          placeholder="e.g., How do I answer 'What is your greatest weakness?'"
          className="w-full min-h-[120px] resize-y bg-transparent text-[#4A4A4A] placeholder:text-[#829AB1]/70 focus:outline-none p-4 rounded-2xl"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          disabled={loading}
        />
        <div className="flex justify-end p-2 border-t border-[#829AB1]/10 bg-white/50 rounded-b-2xl">
          <button
            onClick={handleAsk}
            disabled={loading || !query.trim()}
            className="flex items-center gap-2 px-6 py-2.5 rounded-xl font-medium bg-[#C97A5D] hover:bg-[#B3684D] text-white shadow-sm transition-all disabled:opacity-50"
          >
            {loading ? (
              <Loader2 className="h-4 w-4 animate-spin" />
            ) : (
              <Send className="h-4 w-4" />
            )}
            {loading ? 'Thinking...' : 'Ask AI'}
          </button>
        </div>
      </div>

      {error && (
        <div className="p-4 rounded-xl bg-[#A86464]/10 border border-[#A86464]/20 text-[#A86464] text-sm text-center">
          {error}
        </div>
      )}

      {response && (
        <div className="flex-1 mt-4">
          <InsightCard
            title="AI Response"
            icon={<BotMessageSquare className="w-5 h-5" />}
            className="h-full border-[#829AB1]/30"
            delay={100}
          >
            <div className="prose prose-stone max-w-none">
              <p className="whitespace-pre-wrap leading-relaxed text-[15px]">
                {response}
              </p>
            </div>
          </InsightCard>
        </div>
      )}
    </div>
  );
}
