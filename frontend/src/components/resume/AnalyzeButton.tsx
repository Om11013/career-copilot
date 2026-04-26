import { Loader2, Sparkles } from 'lucide-react';

import { Button } from '@/components/ui/button';

interface AnalyzeButtonProps {
  loading: boolean;
  disabled: boolean;
  onClick: () => void;
}

export function AnalyzeButton({
  loading,
  disabled,
  onClick,
}: AnalyzeButtonProps) {
  return (
    <Button
      onClick={onClick}
      disabled={disabled || loading}
      size="lg"
      className="w-full relative overflow-hidden group bg-[#C97A5D] hover:bg-[#B3684D] text-white rounded-xl shadow-sm hover:shadow-md transition-all duration-300 border-none"
    >
      {loading ? (
        <>
          <Loader2 className="mr-2 h-5 w-5 animate-spin" />
          Analyzing Resume...
        </>
      ) : (
        <>
          <Sparkles className="mr-2 h-5 w-5" />
          Analyze Insights
        </>
      )}
    </Button>
  );
}
