import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5500/api/v1';

export const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Attach access token automatically
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('pms_access_token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  const tenantSlug = localStorage.getItem('pms_tenant_slug');
  if (tenantSlug) {
    config.headers['x-tenant-slug'] = tenantSlug;
  }
  return config;
});

// Interceptor for 401 response handling
api.interceptors.response.use(
  (response) => response,
  async (error) => {
    if (error.response?.status === 401) {
      // If refresh token logic is needed or session expired
      console.warn('Authentication expired or unauthorized');
    }
    return Promise.reject(error);
  }
);

export default api;
