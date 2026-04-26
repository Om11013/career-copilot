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
} from 'lucide-react';

import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';

const navigation = [
  { name: 'Dashboard', href: '/dashboard', icon: LayoutDashboard },
  { name: 'Resume Analyzer', href: '/resume-analyzer', icon: FileText },
  { name: 'Job Matcher', href: '/job-matcher', icon: Briefcase },
  { name: 'Resume Tailor', href: '/resume-tailor', icon: Edit },
  { name: 'Career Agent', href: '/career-agent', icon: Bot },
  { name: 'Ask AI', href: '/ask', icon: Lightbulb },
  { name: 'Insights', href: '/insights', icon: Lightbulb },
  { name: 'Resume Versions', href: '/resume-versions', icon: Layers },
  {
    name: 'Application Tracker',
    href: '/application-tracker',
    icon: ListChecks,
  },
];

export default function Sidebar() {
  const location = useLocation();

  return (
    <div className="flex w-64 flex-col border-r bg-zinc-50/50 px-3 py-6">
      <div className="mb-8 px-4">
        <h1 className="text-xl font-bold text-zinc-900">Career Copilot</h1>
      </div>
      <nav className="flex-1 space-y-1">
        {navigation.map((item) => {
          const isActive = location.pathname === item.href;
          return (
            <Link key={item.name} to={item.href}>
              <Button
                variant={isActive ? 'secondary' : 'ghost'}
                className={cn(
                  'w-full justify-start gap-3 px-4 py-2 text-sm',
                  isActive
                    ? 'bg-zinc-200/50 text-zinc-900 font-medium'
                    : 'text-zinc-600 hover:bg-zinc-100 hover:text-zinc-900',
                )}
              >
                <item.icon className="h-4 w-4" />
                {item.name}
              </Button>
            </Link>
          );
        })}
      </nav>
    </div>
  );
}
