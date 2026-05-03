import { Link, useLocation } from 'react-router-dom';
import {
  LayoutDashboard,
  FileText,
  Briefcase,
  Edit,
  Bot,
  Lightbulb,
  Layers,
  ListChecks,
  X,
} from 'lucide-react';

import { cn } from '@/utils/cn';
import { Button } from '@/components/ui/button';

const navigation = [
  { name: 'Dashboard', href: '/dashboard', icon: LayoutDashboard },
  { name: 'Resume Analyzer', href: '/resume-analyzer', icon: FileText },
  { name: 'Job Matcher', href: '/job-matcher', icon: Briefcase },
  { name: 'Resume Tailor', href: '/resume-tailor', icon: Edit },
  { name: 'Career Agent', href: '/career-agent', icon: Bot },
  { name: 'Ask AI', href: '/ask', icon: Lightbulb, localOnly: true },
  { name: 'Insights', href: '/insights', icon: Lightbulb },
  { name: 'Resume Versions', href: '/resume-versions', icon: Layers },
  {
    name: 'Application Tracker',
    href: '/application-tracker',
    icon: ListChecks,
  },
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
        <nav className="flex-1 space-y-1.5 overflow-y-auto pr-2 custom-scrollbar">
          {navigation
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
        </nav>
      </div>
    </>
  );
}
