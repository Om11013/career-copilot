import axios from 'axios';

const API = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
});

export const analyzeResume = async (resume: string) => {
  const res = await API.post('/ai/analyze-resume', {
    resume,
  });
  return res.data;
};
