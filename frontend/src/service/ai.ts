import axios from 'axios';

const API = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
});

export const askAI = async (query: string) => {
  const res = await API.get('/ai/ask', {
    params: { query },
  });
  return res.data.response;
};
