import axios from 'axios';
import { API_ENDPOINTS , API_CONFIG } from '../config/api';
import authService from './authService';

const axiosClient = axios.create({
    baseURL: API_ENDPOINTS.BASE_URL,
    headers: API_CONFIG.headers
});

axiosClient.interceptors.request.use(
    (config) => {        
      const token = localStorage.getItem('accessToken');
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
      return config;
    },
    (error) => {
      return Promise.reject(error);
    }
);

axiosClient.interceptors.response.use(
    (response) => response,
    async (error) => {
      const originalRequest = error.config;
  
      if (error.response?.status === 401 && !originalRequest._retry) {
        originalRequest._retry = true;
  
        try {
          await authService.refreshToken(); 
          return axiosClient(originalRequest);
        } catch (refreshError) {
          throw refreshError;
        }
      }
  
      const message = error.response?.data?.message || 'An error occurred';
      console.error('API Error:', message);
      throw new Error(message);
    }
);

const protectedService = {
    getUser: async () => {
        const response = await axiosClient.get(API_ENDPOINTS.USER);
        return response.data;
    },

    postTransaction: async (transaction) => {
        const response = await axiosClient.post(API_ENDPOINTS.TRANSACTIONS, transaction);
        return response.data;
    },

    getTransactions: async () => {
        const response = await axiosClient.get(API_ENDPOINTS.TRANSACTIONS);
        return response.data.transactions;
    },

    getBalance: async () => {
        const response = await axiosClient.get(API_ENDPOINTS.BALANCE);
        return response.data.balance;
    }
}

export default protectedService;