import { useState, useEffect } from 'react';
import { authAPI } from '../services/api.service';

interface User {
  id: string;
  email: string;
  email_verified: boolean;
  created_at: string;
}

interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
}

export const useAuth = () => {
  const [authState, setAuthState] = useState<AuthState>({
    user: null,
    isAuthenticated: false,
    isLoading: true,
  });

  useEffect(() => {
    checkAuth();
  }, []);

  const checkAuth = async () => {
    const token = localStorage.getItem('access_token');
    const userStr = localStorage.getItem('user');

    if (token && userStr) {
      try {
        const user = JSON.parse(userStr);
        setAuthState({
          user,
          isAuthenticated: true,
          isLoading: false,
        });
      } catch (error) {
        setAuthState({
          user: null,
          isAuthenticated: false,
          isLoading: false,
        });
      }
    } else {
      setAuthState({
        user: null,
        isAuthenticated: false,
        isLoading: false,
      });
    }
  };

  const login = async (email: string, password: string) => {
    try {
      const response = await authAPI.login(email, password);
      setAuthState({
        user: response.user,
        isAuthenticated: true,
        isLoading: false,
      });
      return response;
    } catch (error: unknown) {
      throw new Error((error as { response?: { data?: { message?: string } } }).response?.data?.message || 'Login failed');
    }
  };

  const register = async (email: string, password: string) => {
    try {
      const response = await authAPI.register(email, password);
      return response;
    } catch (error: unknown) {
      throw new Error((error as { response?: { data?: { message?: string } } }).response?.data?.message || 'Registration failed');
    }
  };

  const logout = async () => {
    try {
      await authAPI.logout();
      setAuthState({
        user: null,
        isAuthenticated: false,
        isLoading: false,
      });
    } catch (error) {
      // Even if API call fails, clear local state
      localStorage.removeItem('access_token');
      localStorage.removeItem('refresh_token');
      localStorage.removeItem('user');
      setAuthState({
        user: null,
        isAuthenticated: false,
        isLoading: false,
      });
    }
  };

  const verifyEmail = async (token: string) => {
    try {
      const response = await authAPI.verifyEmail(token);
      return response;
    } catch (error: unknown) {
      throw new Error((error as { response?: { data?: { message?: string } } }).response?.data?.message || 'Email verification failed');
    }
  };

  const forgotPassword = async (email: string) => {
    try {
      const response = await authAPI.forgotPassword(email);
      return response;
    } catch (error: unknown) {
      throw new Error((error as { response?: { data?: { message?: string } } }).response?.data?.message || 'Password reset request failed');
    }
  };

  const resetPassword = async (token: string, newPassword: string) => {
    try {
      const response = await authAPI.resetPassword(token, newPassword);
      return response;
    } catch (error: unknown) {
      throw new Error((error as { response?: { data?: { message?: string } } }).response?.data?.message || 'Password reset failed');
    }
  };

  return {
    ...authState,
    login,
    register,
    logout,
    verifyEmail,
    forgotPassword,
    resetPassword,
    checkAuth,
  };
};
