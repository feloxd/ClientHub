import axios from 'axios';

const productionApi = 'https://api-production-6ffaa.up.railway.app/api';
const configuredApi = import.meta.env.VITE_API_URL;
const baseURL = import.meta.env.PROD
  ? productionApi
  : configuredApi || 'http://localhost:3001/api';

const api = axios.create({
  baseURL,
  withCredentials: true
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem('nexo_access');
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

let refreshing;
api.interceptors.response.use((response) => response, async (error) => {
  const original = error.config;
  if (error.response?.status === 401 && !original._retry && !original.url?.includes('/auth/')) {
    original._retry = true;
    refreshing ||= api.post('/auth/refresh')
      .then(({ data }) => {
        localStorage.setItem('nexo_access', data.accessToken);
        localStorage.setItem('nexo_user', JSON.stringify(data.user));
        return data.accessToken;
      }).finally(() => { refreshing = null; });
    try {
      original.headers.Authorization = `Bearer ${await refreshing}`;
      return api(original);
    } catch {
      localStorage.removeItem('nexo_access');
      localStorage.removeItem('nexo_user');
      window.location.href = '/login';
    }
  }
  return Promise.reject(error);
});

export default api;
