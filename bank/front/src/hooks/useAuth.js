import { useState } from 'react';
import authService from '../services/authService';

export function useAuth() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const login = async (email, password) => {
    try {
      setIsLoading(true);
      setError(null);
      const result = await authService.login(email, password);
      return result;
    } catch (err) {
      setError(err.message);
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  const logout = () => {
    authService.logout();
  };
  
  const signup = async (userData) => {
    try {
      const result = await authService.signup(userData);
      return result;
    } catch (err) {
      setError(err.message);
      throw err;
    }
  }

  const confirmSignup = async (passcode) => {
    try {
      const result = await authService.confirmSignup(passcode);
      return result;
    } catch (err) {
      setError(err.message);
      throw err;
    }
  }

  const resendConfirmation = async (email) => {
    try {
      const result = await authService.resendConfirmation(email);
      return result;
    } catch (err) {
      setError(err.message);
      throw err;
    }
  }

  const refreshToken = async () => {
    try {
      const result = await authService.refreshToken();
      return result;
    } catch (err) {
      setError(err.message);
      throw err;
    }
  }

  return {
    login,
    logout,
    isLoading,
    error,
    isAuthenticated: authService.isAuthenticated,
    signup,
    confirmSignup,
    resendConfirmation,
    refreshToken
  };
} 