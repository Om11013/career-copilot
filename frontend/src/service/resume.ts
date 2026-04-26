import axios from 'axios';

const API = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
});

export const analyzeResume = async (resumeText: string, file: File | null) => {
  const formData = new FormData();

  if (file) {
    formData.append('file', file);
  }
  if (resumeText) {
    formData.append('resume', resumeText);
  }

  const res = await API.post('/ai/analyze-resume', formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });

  return res.data;
};
