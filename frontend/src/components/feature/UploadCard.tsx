import React from 'react';
import { UploadCloud, FileText, X, Eye } from 'lucide-react';

interface UploadCardProps {
  file: File | null;
  onFileChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onClear: () => void;
  disabled: boolean;
}

export function UploadCard({
  file,
  onFileChange,
  onClear,
  disabled,
}: UploadCardProps) {
  return (
    <div className="relative group rounded-2xl border border-dashed border-[#829AB1]/40 bg-[#FAF7F5] hover:bg-white transition-all duration-300 overflow-hidden shadow-sm">
      {file ? (
        <div className="flex items-center justify-between p-6 relative z-10">
          <div className="flex items-center space-x-4">
            <div className="p-3 bg-[#829AB1]/10 rounded-xl">
              <FileText className="h-6 w-6 text-[#829AB1]" />
            </div>
            <div>
              <p className="text-sm font-medium text-[#4A4A4A] truncate max-w-[200px] sm:max-w-xs">
                {file.name}
              </p>
              <p className="text-xs text-[#829AB1]">
                {(file.size / 1024 / 1024).toFixed(2)} MB
              </p>
            </div>
          </div>
          <div className="flex items-center space-x-2">
            <button
              onClick={(e) => {
                e.preventDefault();
                if (file) {
                  const url = URL.createObjectURL(file);
                  window.open(url, '_blank');
                }
              }}
              disabled={disabled}
              className="p-2 rounded-full hover:bg-[#829AB1]/10 text-[#829AB1] transition-colors disabled:opacity-50"
              aria-label="View file"
            >
              <Eye className="h-5 w-5" />
            </button>
            <button
              onClick={onClear}
              disabled={disabled}
              className="p-2 rounded-full hover:bg-[#C97A5D]/10 text-[#829AB1] hover:text-[#C97A5D] transition-colors disabled:opacity-50"
              aria-label="Remove file"
            >
              <X className="h-5 w-5" />
            </button>
          </div>
        </div>
      ) : (
        <label className="flex flex-col items-center justify-center p-8 text-center cursor-pointer relative z-10 h-full">
          <div className="p-4 bg-[#829AB1]/10 rounded-full mb-4 group-hover:scale-110 transition-transform duration-300">
            <UploadCloud className="h-8 w-8 text-[#829AB1]" />
          </div>
          <p className="text-sm font-medium text-[#4A4A4A]">
            Upload PDF Resume
          </p>
          <p className="text-xs text-[#829AB1] mt-1">
            Preserves original formatting
          </p>
          <input
            type="file"
            accept=".pdf"
            onChange={onFileChange}
            disabled={disabled}
            className="hidden"
          />
        </label>
      )}
    </div>
  );
}
