import { useState, useEffect } from 'react';
import authService from '../services/authService';

export function useAuth() {
  const [isLoading, setIsLoading] = useState(false);
  const [apiError, setApiError] = useState();
  
  const login = async (email, password) => {
    try {
      setIsLoading(true);
      setApiError(null);
      const result = await authService.login(email, password);
      setIsAuthenticated(true);
      return result;
    } catch (err) {
      setApiError(parseError(err.message));
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  const logout = () => {
    authService.logout();
    setIsAuthenticated(false);
  };
  
  const signup = async (userData) => {
    try {
      const result = await authService.signup(userData);
      return result;
    } catch (err) {
      setApiError(parseError(err.message));
      throw err;
    }
  }

  const confirmSignup = async (passcode) => {
    try {
      const result = await authService.confirmSignup(passcode);
      return result;
    } catch (err) {
      setApiError(err.message);
      throw err;
    }
  }

  const resendConfirmation = async (email) => {
    try {
      const result = await authService.resendConfirmation(email);
      return result;
    } catch (err) {
      setApiError(err.message);
      throw err;
    }
  }

  const refreshToken = async () => {
    try {
      const result = await authService.refreshToken();
      return result;
    } catch (err) {
      setApiError(err.message);
      throw err;
    }
  }

  const parseError = (error) => {
    return error.split(',');
  }

  const isAuthenticated = function () {
    return authService.isAuthenticated();
  }

  return {
    login,
    logout,
    isLoading,
    apiError,
    isAuthenticated,
    signup,
    confirmSignup,
    resendConfirmation,
    refreshToken
  };
} 