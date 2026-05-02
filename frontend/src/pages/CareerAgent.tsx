import { useState, useEffect } from 'react';

import { UploadSection } from '@/components/feature/agent/UploadSection';
import {
  ChatWindow,
  type Message,
} from '@/components/feature/agent/ChatWindow';
import { InputBox } from '@/components/feature/agent/InputBox';
import { callOrchestrator } from '@/services/orchestratorApi';
import {
  getResumeFromDB,
  clearResumeFromDB,
  saveResumeToDB,
} from '@/utils/indexedDB';

export default function CareerAgent() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [loading, setLoading] = useState(false);

  const [resumeFile, setResumeFile] = useState<File | null>(null);
  const [resumeData, setResumeData] = useState<unknown | null>(null);

  useEffect(() => {
    // Load resume from IndexedDB on mount
    getResumeFromDB().then((data) => {
      if (data) {
        if (data.file) setResumeFile(data.file as File);
        if (data.parsedData) setResumeData(data.parsedData);
      }
    });
  }, []);

  const handleFileChange = (file: File) => {
    setResumeFile(file);
    setResumeData(null);
  };

  const handleClearResume = () => {
    setResumeFile(null);
    setResumeData(null);
    clearResumeFromDB();
  };

  const handleSend = async (query: string, jobDescription?: string) => {
    // Add user message
    const userMsg: Message = {
      id: crypto.randomUUID(),
      role: 'user',
      content: query,
    };
    setMessages((prev) => [...prev, userMsg]);
    setLoading(true);

    try {
      const payload = {
        user_query: query,
        resume_file: resumeFile,
        resume_data: resumeData,
        job_description: jobDescription,
      };

      const result = await callOrchestrator(payload);

      // Extract response or structured data
      let content: string | object = '';
      if (result.response) {
        content = result.response;
      } else if (result.intent && result.data) {
        content = result.data;
      } else {
        content = result; // fallback
      }

      const assistantMsg: Message = {
        id: crypto.randomUUID(),
        role: 'assistant',
        content,
      };
      setMessages((prev) => [...prev, assistantMsg]);

      // If this was a resume analysis, the orchestrator returns structured data with intent 'resume_analysis'.
      // We should check if resume_data was updated.
      if (result.data && result.data.resume_data) {
        setResumeData(result.data.resume_data);
        saveResumeToDB(resumeFile, result.data.resume_data).catch(
          // eslint-disable-next-line no-console
          console.error,
        );
      }
    } catch (err) {
      const errorMsg: Message = {
        id: crypto.randomUUID(),
        role: 'assistant',
        content: `Error: ${err instanceof Error ? err.message : 'Unknown error'}`,
      };
      setMessages((prev) => [...prev, errorMsg]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col h-full max-w-4xl mx-auto border border-[#829AB1]/20 rounded-3xl overflow-hidden shadow-sm bg-white/60 backdrop-blur-md">
      <UploadSection
        resumeFile={resumeFile}
        resumeData={resumeData}
        onFileChange={handleFileChange}
        onClear={handleClearResume}
        disabled={loading}
      />
      <ChatWindow messages={messages} loading={loading} />
      <div className="p-4 bg-white border-t border-[#829AB1]/20">
        <InputBox onSend={handleSend} disabled={loading} />
      </div>
    </div>
  );
}
