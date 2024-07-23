import axios from 'axios';
import Cookies from 'js-cookie';

export const authenticatedAxios = axios.create({
  baseURL: import.meta.env.VITE_BACKEND_URL,
});

authenticatedAxios.interceptors.request.use((config) => {
  const token = Cookies.get('jwt');

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  } else {
    throw new Error('No token found');
  }

  return config;
});
