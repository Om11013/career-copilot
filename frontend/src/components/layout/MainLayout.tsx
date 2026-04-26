import { useState } from 'react';
import { Outlet } from 'react-router-dom';
import { Menu } from 'lucide-react';
import { Bot } from 'lucide-react';

import Sidebar from './Sidebar';

export default function MainLayout() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
    <div className="flex h-screen w-full bg-[#F3E9E0] text-[#4A4A4A] overflow-hidden font-sans selection:bg-[#C97A5D]/20">
      <Sidebar isOpen={isSidebarOpen} setIsOpen={setIsSidebarOpen} />

      <main className="flex-1 flex flex-col h-full overflow-hidden relative">
        {/* Mobile Header */}
        <div className="lg:hidden flex items-center justify-between p-4 bg-[#FAF7F5] border-b border-[#829AB1]/20 shadow-sm z-10">
          <div className="flex items-center gap-2">
            <div className="p-1.5 bg-[#C97A5D]/10 rounded-md">
              <Bot className="w-5 h-5 text-[#C97A5D]" />
            </div>
            <span className="font-bold tracking-tight text-[#4A4A4A] text-lg">
              Career Copilot
            </span>
          </div>
          <button
            onClick={() => setIsSidebarOpen(true)}
            className="p-2 -mr-2 rounded-lg hover:bg-[#829AB1]/10 text-[#4A4A4A] transition-colors"
          >
            <Menu className="w-6 h-6" />
          </button>
        </div>

        {/* Content Area */}
        <div className="flex-1 overflow-y-auto">
          <div className="mx-auto max-w-7xl p-4 md:p-8 relative z-0 min-h-full">
            <Outlet />
          </div>
        </div>
      </main>
    </div>
  );
}
