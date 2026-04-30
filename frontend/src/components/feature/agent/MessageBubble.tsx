import React from 'react';
import { User, Bot } from 'lucide-react';

interface MessageBubbleProps {
  role: 'user' | 'assistant';
  content: string | object;
}

export const MessageBubble: React.FC<MessageBubbleProps> = ({
  role,
  content,
}) => {
  const isUser = role === 'user';

  const renderContent = () => {
    if (typeof content === 'string') {
      return (
        <p className="whitespace-pre-wrap leading-relaxed text-[15px]">
          {content}
        </p>
      );
    }
    // If it's structured data
    return (
      <pre className="text-xs bg-white/50 p-2 rounded overflow-x-auto">
        {JSON.stringify(content, null, 2)}
      </pre>
    );
  };

  return (
    <div
      className={`flex w-full ${isUser ? 'justify-end' : 'justify-start'} mb-4`}
    >
      <div
        className={`flex max-w-[85%] ${isUser ? 'flex-row-reverse' : 'flex-row'} gap-3 items-end`}
      >
        <div
          className={`shrink-0 w-8 h-8 rounded-full flex items-center justify-center ${isUser ? 'bg-[#C97A5D] text-white' : 'bg-[#829AB1] text-white'}`}
        >
          {isUser ? <User className="w-5 h-5" /> : <Bot className="w-5 h-5" />}
        </div>
        <div
          className={`px-4 py-3 rounded-2xl ${isUser ? 'bg-[#FAF7F5] border border-[#829AB1]/20 text-[#4A4A4A] rounded-br-none' : 'bg-white border border-[#829AB1]/10 shadow-sm text-[#4A4A4A] rounded-bl-none'}`}
        >
          {renderContent()}
        </div>
      </div>
    </div>
  );
};
