import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { authAPI } from '../services/api.service';

interface User {
  id: string;
  email: string;
  email_verified: boolean;
  created_at: string;
}

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<{ accessToken: string; refreshToken: string; user: User }>;
  register: (email: string, password: string) => Promise<{ user: User; message: string }>;
  logout: () => Promise<void>;
  verifyEmail: (token: string) => Promise<{ message: string }>;
  forgotPassword: (email: string) => Promise<{ message: string }>;
  resetPassword: (token: string, newPassword: string) => Promise<{ message: string }>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [user, setUser] = useState<User | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  // Check if user is already logged in on mount
  useEffect(() => {
    const initAuth = async () => {
      const token = localStorage.getItem('access_token');
      const storedUser = localStorage.getItem('user');
      
      if (token && storedUser) {
        try {
          const parsedUser = JSON.parse(storedUser);
          setUser(parsedUser);
          setIsAuthenticated(true);
        } catch (error) {
          localStorage.removeItem('access_token');
          localStorage.removeItem('refresh_token');
          localStorage.removeItem('user');
        }
      }
      setIsLoading(false);
    };

    initAuth();
  }, []);

  const login = async (email: string, password: string) => {
    try {
      const response = await authAPI.login(email, password);
      
      // Store tokens
      localStorage.setItem('access_token', response.accessToken);
      localStorage.setItem('refresh_token', response.refreshToken);
      localStorage.setItem('user', JSON.stringify(response.user));
      
      // Update state
      setUser(response.user);
      setIsAuthenticated(true);
      
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
    } catch (error) {
      // Even if API call fails, clear local state
      console.error('Logout error:', error);
    } finally {
      // Always clear local storage and state
      localStorage.removeItem('access_token');
      localStorage.removeItem('refresh_token');
      localStorage.removeItem('user');
      setUser(null);
      setIsAuthenticated(false);
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

  const value: AuthContextType = {
    user,
    isAuthenticated,
    isLoading,
    login,
    register,
    logout,
    verifyEmail,
    forgotPassword,
    resetPassword,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
