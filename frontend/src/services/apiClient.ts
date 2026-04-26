import axios from 'axios';

const apiClient = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
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
