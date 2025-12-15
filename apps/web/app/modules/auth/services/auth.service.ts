import axios from 'axios';
import type { InternalAxiosRequestConfig, AxiosError, AxiosResponse } from 'axios';

// Create axios instance with base URL
// Assuming backend is running on localhost:3005/api based on previous tasks
export const api = axios.create({
  baseURL: 'http://localhost:3005/api',
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add a request interceptor to attach the token
api.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error: AxiosError) => {
    return Promise.reject(error);
  }
);

// Add a response interceptor to handle 401 errors
api.interceptors.response.use(
  (response: AxiosResponse) => {
    return response;
  },
  (error: AxiosError) => {
    if (error.response && error.response.status === 401) {
      // Clear token and redirect to login if unauthorized
      // We'll handle the redirect in the AuthContext or component level usually,
      // but clearing storage here ensures state consistency.
      localStorage.removeItem('token');
      // Optional: window.location.href = '/login'; 
      // Better to let the AuthContext handle the state change and redirect
    }
    return Promise.reject(error);
  }
);
