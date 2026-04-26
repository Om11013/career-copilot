import { Sparkles } from 'lucide-react';

export function LoaderSkeleton() {
  return (
    <div className="flex flex-col items-center justify-center p-12 space-y-6 animate-in fade-in duration-500">
      <div className="relative p-6 bg-[#F3E9E0] border border-[#C97A5D]/20 rounded-full shadow-sm animate-pulse">
        <Sparkles className="w-8 h-8 text-[#C97A5D]" />
      </div>
      <div className="space-y-2 text-center">
        <h3 className="text-xl font-semibold text-[#4A4A4A]">
          Analyzing your career profile...
        </h3>
        <p className="text-[#829AB1] text-sm">
          Our AI is reading your resume and generating actionable insights.
        </p>
      </div>

      {/* Skeleton Cards */}
      <div className="w-full max-w-2xl space-y-4 mt-8 opacity-60">
        <div className="h-24 w-full bg-[#E5DCD3] rounded-2xl animate-pulse" />
        <div className="grid grid-cols-2 gap-4">
          <div
            className="h-32 w-full bg-[#E5DCD3] rounded-2xl animate-pulse"
            style={{ animationDelay: '150ms' }}
          />
          <div
            className="h-32 w-full bg-[#E5DCD3] rounded-2xl animate-pulse"
            style={{ animationDelay: '300ms' }}
          />
        </div>
      </div>
    </div>
  );
}
