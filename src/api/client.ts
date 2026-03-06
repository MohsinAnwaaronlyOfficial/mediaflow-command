import axios from 'axios';

const BASE = import.meta.env.VITE_API_URL || '/api';

const api = axios.create({ baseURL: BASE });

// Attach token
api.interceptors.request.use(config => {
  const token = sessionStorage.getItem('umf_token');
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

// Auto-logout on 401 (but NOT on login endpoint)
api.interceptors.response.use(
  r => r,
  err => {
    const url = err.config?.url || '';
    const isAuthEndpoint = url.includes('/auth/login') || url.includes('/auth/refresh') || url.includes('/auth/forgot');
    if (err.response?.status === 401 && !isAuthEndpoint) {
      sessionStorage.removeItem('umf_token');
      window.location.href = '/login';
    }
    return Promise.reject(err);
  }
);

export default api;
