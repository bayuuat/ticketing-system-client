import axios from 'axios';
import Cookies from 'js-cookie';

const customAxios = axios.create({
  baseURL: 'http://localhost:8080/api', // Your API base URL
});

customAxios.interceptors.response.use(
  response => {
    return response;
  },
  error => {
    if (error.response.status === 401 && error.response.data.statusCode === 401) {
      // Token has expired or user is unauthorized
      Cookies.remove('access_token');
      window.location = '/login';
    }
    return Promise.reject(error);
  }
);

export default customAxios;