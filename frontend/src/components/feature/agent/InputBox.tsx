import React, { useState } from 'react';
import { Send, Paperclip, ChevronDown } from 'lucide-react';

interface InputBoxProps {
  onSend: (query: string, jobDescription?: string) => void;
  disabled: boolean;
}

export const InputBox: React.FC<InputBoxProps> = ({ onSend, disabled }) => {
  const [query, setQuery] = useState('');
  const [jobDescription, setJobDescription] = useState('');
  const [showJdInput, setShowJdInput] = useState(false);

  const handleSend = () => {
    if (!query.trim()) return;
    onSend(query, jobDescription);
    setQuery('');
  };

  return (
    <div className="bg-[#FAF7F5] border border-[#829AB1]/20 rounded-3xl p-2 shadow-sm relative overflow-hidden focus-within:border-[#C97A5D]/50 transition-all duration-300">
      {showJdInput && (
        <div className="px-4 pt-4 pb-2">
          <label className="text-xs font-semibold text-[#829AB1] uppercase tracking-wider mb-2 block">
            Optional: Paste Job Description
          </label>
          <textarea
            placeholder="Paste the job posting here to get matching insights..."
            className="w-full min-h-[80px] resize-y bg-white/50 border border-[#829AB1]/10 text-[#4A4A4A] placeholder:text-[#829AB1]/50 focus:outline-none p-3 rounded-xl text-sm"
            value={jobDescription}
            onChange={(e) => setJobDescription(e.target.value)}
            disabled={disabled}
          />
        </div>
      )}
      <div className="flex items-center">
        <button
          onClick={() => setShowJdInput(!showJdInput)}
          className="p-3 text-[#829AB1] hover:text-[#C97A5D] transition-colors"
          title="Toggle Job Description Input"
        >
          {showJdInput ? (
            <ChevronDown className="w-5 h-5" />
          ) : (
            <Paperclip className="w-5 h-5" />
          )}
        </button>
        <input
          type="text"
          placeholder="Ask me anything (e.g., 'Am I a good fit for this job?')"
          className="flex-1 bg-transparent text-[#4A4A4A] placeholder:text-[#829AB1]/70 focus:outline-none px-2 py-3"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === 'Enter' && !e.shiftKey) {
              e.preventDefault();
              handleSend();
            }
          }}
          disabled={disabled}
        />
        <button
          onClick={handleSend}
          disabled={disabled || !query.trim()}
          className="p-3 mr-1 rounded-full bg-[#C97A5D] hover:bg-[#B3684D] text-white transition-all disabled:opacity-50"
        >
          <Send className="h-4 w-4" />
        </button>
      </div>
    </div>
  );
};
