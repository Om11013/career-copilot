import React, { useEffect, useRef } from 'react';
import { Loader2 } from 'lucide-react';

import { MessageBubble } from './MessageBubble';

export interface Message {
  id: string;
  role: 'user' | 'assistant';
  content: string | object;
}

interface ChatWindowProps {
  messages: Message[];
  loading: boolean;
}

export const ChatWindow: React.FC<ChatWindowProps> = ({
  messages,
  loading,
}) => {
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, loading]);

  return (
    <div className="flex-1 overflow-y-auto p-4 space-y-2">
      {messages.length === 0 && (
        <div className="h-full flex flex-col items-center justify-center text-center text-[#829AB1]">
          <div className="w-16 h-16 bg-[#829AB1]/10 rounded-full flex items-center justify-center mb-4">
            <span className="text-3xl">👋</span>
          </div>
          <h3 className="text-xl font-medium text-[#4A4A4A]">
            I'm your Career Copilot
          </h3>
          <p className="mt-2 text-sm max-w-sm">
            Upload your resume and ask me anything about your career, job
            matches, or interview prep.
          </p>
        </div>
      )}

      {messages.map((msg) => (
        <MessageBubble key={msg.id} role={msg.role} content={msg.content} />
      ))}

      {loading && (
        <div className="flex w-full justify-start mb-4">
          <div className="flex max-w-[85%] sm:max-w-[75%] md:max-w-[70%] lg:max-w-[65%] flex-row gap-3 items-end">
            <div className="shrink-0 w-8 h-8 rounded-full flex items-center justify-center bg-[#829AB1] text-white">
              <Loader2 className="w-4 h-4 animate-spin" />
            </div>
            <div className="px-4 py-3 rounded-2xl bg-white border border-[#829AB1]/10 shadow-sm rounded-bl-none text-[#829AB1]">
              <span className="animate-pulse">Thinking...</span>
            </div>
          </div>
        </div>
      )}
      <div ref={bottomRef} />
    </div>
  );
};
