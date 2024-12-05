// Handle all authentication-related API calls
import axios from 'axios';
import { API_ENDPOINTS , API_CONFIG } from '../config/api';

const axiosClient = axios.create({
    baseURL: API_ENDPOINTS.BASE_URL,
    headers: API_CONFIG.headers
});

axiosClient.interceptors.response.use(
    (response) => response,
    async (error) => {
      const message = error.response?.data?.message || 'An error occurred';
      return Promise.reject(new Error(message));
    }
);

const authService = {
    login: async (email, password) => {
      try {
        const response = await axiosClient.post(API_ENDPOINTS.LOGIN, {
            email,
            password
        });
        
        const { accessToken, refreshToken } = response.data;
  
        localStorage.setItem('accessToken', accessToken);
        localStorage.setItem('refreshToken', refreshToken);

        return response.data;
        
      } catch (error) {
        console.log('Login error:', error);
        throw error;
      }
    },
  
    logout: () => {
      localStorage.removeItem('accessToken');
      localStorage.removeItem('refreshToken');
    },

    signup: async (userData) => {
        try {
          const response = await axiosClient.post(API_ENDPOINTS.SIGNUP, userData);
          return response.data;
        } catch (error) {
          console.log('Registration error:', error.message);
          throw error;
        }
    },

    confirmSignup: async (passcode) => {
        try {       
            const response = await axiosClient.post(API_ENDPOINTS.CONFIRM_SIGNUP, { confirmationCode: passcode });
            return response.data;
        } catch (error) {
            console.log('Confirmation error:', error);
            throw error;
        }
    },

    resendConfirmation: async (email) => {
        try {
            const response = await axiosClient.post(API_ENDPOINTS.RESEND_CONFIRMATION, { email });
            return response.data;
        } catch (error) {
            console.log('Resend confirmation error:', error);
            throw error;
        }
    },
  
    isAuthenticated: () => {
      return !!localStorage.getItem('accessToken');
    },

    refreshToken: async () => {
        try {
          const refreshToken = localStorage.getItem('refreshToken');
          if (!refreshToken) throw new Error('No refresh token available');

    
          const response = await axiosClient.get(API_ENDPOINTS.REFRESH_TOKEN, {
            headers: {
              Authorization: `Bearer ${refreshToken}`
            }
          });
    
          const { accessToken, newRefreshToken } = response.data;
          if (newRefreshToken && accessToken) {
            localStorage.setItem('refreshToken', newRefreshToken);
            localStorage.setItem('accessToken', accessToken);
          }
    
          return response.data;
        } catch (error) {
          console.log('Token refresh error:', error);
          throw error;
        }
    }
};


export default authService;