import axios from 'axios';

const isDevelopment = import.meta.env.DEV;
const API_BASE_URL = isDevelopment
  ? import.meta.env.VITE_API_URL_LOCAL
  : import.meta.env.VITE_API_URL;

const apiClient = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add interceptors if needed later for auth, global error handling, etc.
apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    // Centralized error handling could be done here
    return Promise.reject(error);
  },
);

export default apiClient;
