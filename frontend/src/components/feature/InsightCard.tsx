import React from 'react';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

interface InsightCardProps {
  title: React.ReactNode;
  icon?: React.ReactNode;
  children: React.ReactNode;
  className?: string;
  delay?: number;
}

export function InsightCard({
  title,
  icon,
  children,
  className = '',
  delay = 0,
}: InsightCardProps) {
  return (
    <Card
      className={`pt-0 bg-[#FAF7F5] border border-[#829AB1]/20 text-[#4A4A4A] shadow-sm overflow-hidden animate-in fade-in slide-in-from-bottom-4 fill-mode-both ${className}`}
      style={{ animationDelay: `${delay}ms`, animationDuration: '500ms' }}
    >
      <CardHeader className="border-b border-[#829AB1]/10 bg-white/50 pt-4">
        <CardTitle className="flex items-center gap-3 text-lg font-semibold text-[#4A4A4A] tracking-wide">
          {icon && (
            <span className="text-[#829AB1] p-1.5 bg-[#829AB1]/10 rounded-lg">
              {icon}
            </span>
          )}
          {title}
        </CardTitle>
      </CardHeader>
      <CardContent className="text-[#5C5C5C]">{children}</CardContent>
    </Card>
  );
}
