import { X } from 'lucide-react';

import { Textarea } from '@/components/ui/textarea';

interface TextareaInputProps {
  value: string;
  onChange: (val: string) => void;
  onClear: () => void;
  disabled: boolean;
}

export function TextareaInput({
  value,
  onChange,
  onClear,
  disabled,
}: TextareaInputProps) {
  return (
    <div className="relative group rounded-2xl bg-[#FAF7F5] border border-[#829AB1]/20 transition-all duration-300 overflow-hidden focus-within:border-[#C97A5D]/50 focus-within:ring-1 focus-within:ring-[#C97A5D]/50 shadow-sm">
      <div className="flex justify-between items-center px-4 py-3 border-b border-[#829AB1]/10 bg-white/50">
        <span className="text-xs font-medium text-[#829AB1] uppercase tracking-wider">
          Or Paste Raw Text
        </span>
        {value && (
          <button
            onClick={onClear}
            disabled={disabled}
            className="text-xs flex items-center space-x-1 text-[#829AB1] hover:text-[#C97A5D] transition-colors disabled:opacity-50"
          >
            <X className="h-3 w-3" />
            <span>Clear</span>
          </button>
        )}
      </div>
      <Textarea
        value={value}
        onChange={(e) => onChange(e.target.value)}
        disabled={disabled}
        placeholder="Paste your plain text resume here..."
        className="min-h-[160px] resize-y border-0 bg-transparent text-[#4A4A4A] placeholder:text-[#829AB1]/50 focus-visible:ring-0 focus-visible:ring-offset-0 rounded-none p-4"
      />
    </div>
  );
}
