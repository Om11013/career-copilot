import { Target } from 'lucide-react';

export default function PlaceholderPage({ title }: { title: string }) {
  return (
    <div className="flex h-full flex-col items-center justify-center p-8 text-center animate-in fade-in zoom-in duration-500">
      <div className="relative mb-8">
        <div className="relative p-6 bg-[#FAF7F5] border border-[#829AB1]/30 rounded-full shadow-sm">
          <Target className="w-12 h-12 text-[#829AB1]" />
        </div>
      </div>

      <h2 className="mb-4 text-3xl font-bold text-[#4A4A4A]">{title}</h2>

      <p className="max-w-md text-[#5C5C5C] leading-relaxed">
        This powerful feature is currently under active development. Our
        engineers are polishing it for the next release.
      </p>

      <div className="mt-12 px-4 py-2 rounded-full border border-[#829AB1]/20 bg-white text-[#829AB1] text-sm font-medium tracking-wide shadow-sm">
        Coming Soon
      </div>
    </div>
  );
}
