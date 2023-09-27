import axios from 'axios';
import Cookies from 'js-cookie';

const customAxios = axios.create({
  baseURL: import.meta.env.VITE_BASE_URL,
});

customAxios.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    if (error.response) {
      if (error.response.status === 401 || error.response.data.statusCode === 401) {
        // Token has expired or user is unauthorized
        Cookies.remove('access_token');
        window.location = '/login';
      }
    }
    return Promise.reject(error);
  }
);

customAxios.interceptors.request.use(
  (config) => {
    const accessToken = Cookies.get('access_token');
    if (accessToken) {
      config.headers.Authorization = `Bearer ${accessToken}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default customAxios;
