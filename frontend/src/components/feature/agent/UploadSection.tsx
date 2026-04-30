import React from 'react';
import { FileText, X, UploadCloud } from 'lucide-react';

interface UploadSectionProps {
  resumeFile: File | null;
  resumeData: unknown | null;
  onFileChange: (file: File) => void;
  onClear: () => void;
  disabled: boolean;
}

export const UploadSection: React.FC<UploadSectionProps> = ({
  resumeFile,
  resumeData,
  onFileChange,
  onClear,
  disabled,
}) => {
  const hasResume = resumeFile || resumeData;

  return (
    <div className="bg-white border-b border-[#829AB1]/20 p-4 shrink-0 flex items-center justify-between">
      <div className="flex items-center gap-2">
        <h2 className="text-lg font-semibold text-[#4A4A4A]">Context</h2>
        {!!resumeData && (
          <span className="px-2 py-0.5 rounded-full bg-[#829AB1]/10 text-[#829AB1] text-xs font-medium border border-[#829AB1]/20">
            Resume Analyzed
          </span>
        )}
      </div>

      <div className="flex items-center">
        {hasResume ? (
          <div className="flex items-center gap-3 bg-[#FAF7F5] border border-[#829AB1]/20 rounded-full pl-3 pr-1 py-1">
            <FileText className="w-4 h-4 text-[#829AB1]" />
            <span className="text-sm text-[#4A4A4A] truncate max-w-[150px]">
              {resumeFile ? resumeFile.name : 'Saved Resume'}
            </span>
            <button
              onClick={onClear}
              disabled={disabled}
              className="p-1 rounded-full hover:bg-[#C97A5D]/10 text-[#829AB1] hover:text-[#C97A5D] transition-colors disabled:opacity-50"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        ) : (
          <label className="flex items-center gap-2 cursor-pointer bg-[#829AB1]/10 hover:bg-[#829AB1]/20 text-[#829AB1] text-sm font-medium px-4 py-2 rounded-full transition-colors">
            <UploadCloud className="w-4 h-4" />
            <span>Upload Resume</span>
            <input
              type="file"
              accept=".pdf"
              className="hidden"
              disabled={disabled}
              onChange={(e) => {
                if (e.target.files && e.target.files.length > 0) {
                  onFileChange(e.target.files[0]);
                }
              }}
            />
          </label>
        )}
      </div>
    </div>
  );
};
