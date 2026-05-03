import { Link, useLocation } from 'react-router-dom';
import { FileText, Briefcase, Bot, Lightbulb, X } from 'lucide-react';

import { cn } from '@/utils/cn';
import { Button } from '@/components/ui/button';

const mainNavigation = [
  { name: 'Career Agent', href: '/career-agent', icon: Bot },
  { name: 'Ask AI', href: '/ask', icon: Lightbulb, localOnly: true },
];

const toolNavigation = [
  { name: 'Tool: Resume Analyzer', href: '/resume-analyzer', icon: FileText },
  { name: 'Tool: Job Matcher', href: '/job-matcher', icon: Briefcase },
];

interface SidebarProps {
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
}

export default function Sidebar({ isOpen, setIsOpen }: SidebarProps) {
  const location = useLocation();

  return (
    <>
      {/* Mobile Backdrop overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/20 backdrop-blur-sm z-40 lg:hidden transition-opacity"
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* Sidebar Container */}
      <div
        className={cn(
          'fixed inset-y-0 left-0 z-50 flex w-72 flex-col bg-[#FAF7F5] border-r border-[#829AB1]/20 px-3 py-6 shadow-xl lg:shadow-sm transition-transform duration-300 ease-in-out lg:static lg:w-64 lg:translate-x-0',
          isOpen ? 'translate-x-0' : '-translate-x-full',
        )}
      >
        {/* Header */}
        <div className="mb-8 px-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-[#C97A5D]/10 rounded-lg">
              <Bot className="w-5 h-5 text-[#C97A5D]" />
            </div>
            <h1 className="text-xl font-bold tracking-tight text-[#4A4A4A]">
              Career Copilot
            </h1>
          </div>

          <button
            className="lg:hidden p-2 -mr-2 rounded-lg hover:bg-[#829AB1]/10 text-[#829AB1] hover:text-[#4A4A4A] transition-colors"
            onClick={() => setIsOpen(false)}
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Navigation */}
        <nav className="flex-1 space-y-6 overflow-y-auto pr-2 custom-scrollbar">
          {/* Main Navigation */}
          <div className="space-y-1.5">
            {mainNavigation
              .filter((item) => {
                if (item.localOnly) {
                  const isLocal =
                    window.location.hostname === 'localhost' ||
                    window.location.hostname === '127.0.0.1';
                  return isLocal;
                }
                return true;
              })
              .map((item) => {
                const isActive = location.pathname === item.href;
                return (
                  <Link
                    key={item.name}
                    to={item.href}
                    onClick={() => setIsOpen(false)}
                  >
                    <Button
                      variant="ghost"
                      className={cn(
                        'w-full justify-start gap-3 px-4 py-2.5 text-sm transition-all duration-300 rounded-xl',
                        isActive
                          ? 'bg-[#C97A5D]/10 text-[#C97A5D] font-semibold border border-[#C97A5D]/20 shadow-sm'
                          : 'text-[#829AB1] hover:bg-[#829AB1]/10 hover:text-[#4A4A4A] border border-transparent',
                      )}
                    >
                      <item.icon
                        className={cn(
                          'h-4 w-4',
                          isActive ? 'text-[#C97A5D]' : '',
                        )}
                      />
                      {item.name}
                    </Button>
                  </Link>
                );
              })}
          </div>

          {/* Tools Section */}
          <div className="space-y-1.5">
            <h3 className="px-4 text-[10px] font-bold uppercase tracking-wider text-[#829AB1]/60 mb-2">
              Tools (Advanced / Debug)
            </h3>
            {toolNavigation
              .filter((item) => {
                if ('localOnly' in item && item.localOnly) {
                  const isLocal =
                    window.location.hostname === 'localhost' ||
                    window.location.hostname === '127.0.0.1';
                  return isLocal;
                }
                return true;
              })
              .map((item) => {
                const isActive = location.pathname === item.href;
                return (
                  <Link
                    key={item.name}
                    to={item.href}
                    onClick={() => setIsOpen(false)}
                  >
                    <Button
                      variant="ghost"
                      className={cn(
                        'w-full justify-start gap-3 px-4 py-2 text-xs transition-all duration-300 rounded-xl',
                        isActive
                          ? 'bg-[#829AB1]/10 text-[#4A4A4A] font-medium border border-[#829AB1]/20'
                          : 'text-[#829AB1]/70 hover:bg-[#829AB1]/5 hover:text-[#4A4A4A] border border-transparent',
                      )}
                    >
                      <item.icon
                        className={cn(
                          'h-3.5 w-3.5',
                          isActive ? 'text-[#829AB1]' : '',
                        )}
                      />
                      {item.name}
                    </Button>
                  </Link>
                );
              })}
          </div>
        </nav>
      </div>
    </>
  );
}
