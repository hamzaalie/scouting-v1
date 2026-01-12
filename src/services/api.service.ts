import axios, { AxiosInstance, InternalAxiosRequestConfig, AxiosResponse } from 'axios';

// Default to production API if env is not provided
const API_BASE_URL =
  process.env.REACT_APP_BACKEND_URL || 'https://api.idasports.io/api';

// Create axios instance
const apiClient: AxiosInstance = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 30000,
});

// Request interceptor - Add JWT token to requests
apiClient.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    const token = localStorage.getItem('access_token');
    if (token && config.headers) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor - Handle token refresh
apiClient.interceptors.response.use(
  (response: AxiosResponse) => response,
  async (error) => {
    const originalRequest = error.config;

    // If error is 401 and we haven't tried to refresh yet
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      try {
        const refreshToken = localStorage.getItem('refresh_token');
        
        if (!refreshToken) {
          // No refresh token, redirect to login
          localStorage.removeItem('access_token');
          localStorage.removeItem('refresh_token');
          localStorage.removeItem('user');
          window.location.href = '/auth/login';
          return Promise.reject(error);
        }

        // Try to refresh the token
        const response = await axios.post(`${API_BASE_URL}/auth/refresh`, {
          refreshToken,
        });

        const { accessToken, refreshToken: newRefreshToken } = response.data;

        // Update tokens
        localStorage.setItem('access_token', accessToken);
        localStorage.setItem('refresh_token', newRefreshToken);

        // Retry the original request with new token
        originalRequest.headers.Authorization = `Bearer ${accessToken}`;
        return apiClient(originalRequest);
      } catch (refreshError) {
        // Refresh failed, logout user
        localStorage.removeItem('access_token');
        localStorage.removeItem('refresh_token');
        localStorage.removeItem('user');
        window.location.href = '/auth/login';
        return Promise.reject(refreshError);
      }
    }

    return Promise.reject(error);
  }
);

// Auth API
const authAPI = {
  register: async (email: string, password: string) => {
    console.log("=== API SERVICE DEBUG ===");
    console.log("Email param:", email, "Type:", typeof email);
    console.log("Password param:", password, "Type:", typeof password);
    const payload = { 
      email, 
      password,
      platform: 'v1' as const // Specify v1 platform for correct verification URL
    };
    console.log("Payload being sent:", payload);
    console.log("JSON.stringify:", JSON.stringify(payload));
    console.log("=========================");
    const response = await apiClient.post('/auth/register', payload);
    return response.data;
  },

  login: async (email: string, password: string) => {
    const response = await apiClient.post('/auth/login', { email, password });
    const { accessToken, refreshToken, user } = response.data;
    
    // Store tokens
    localStorage.setItem('access_token', accessToken);
    localStorage.setItem('refresh_token', refreshToken);
    localStorage.setItem('user', JSON.stringify(user));
    
    return response.data;
  },

  verifyEmail: async (token: string) => {
    const response = await apiClient.post('/auth/verify-email', { token });
    return response.data;
  },

  forgotPassword: async (email: string) => {
    const response = await apiClient.post('/auth/forgot-password', { email });
    return response.data;
  },

  resetPassword: async (token: string, newPassword: string) => {
    const response = await apiClient.post('/auth/reset-password', { token, newPassword });
    return response.data;
  },

  logout: async () => {
    const refreshToken = localStorage.getItem('refresh_token');
    if (refreshToken) {
      await apiClient.post('/auth/logout', { refreshToken });
    }
    
    localStorage.removeItem('access_token');
    localStorage.removeItem('refresh_token');
    localStorage.removeItem('user');
  },

  getCurrentUser: async () => {
    const response = await apiClient.get('/users/me');
    return response.data;
  },

  getAccountDetails: async () => {
    const response = await apiClient.get('/users/account');
    return response.data;
  },
};

// Subscriptions API
const subscriptionsAPI = {
  getPlans: async () => {
    const response = await apiClient.get('/subscriptions/plans');
    return response.data;
  },

  getStatus: async () => {
    const response = await apiClient.get('/subscriptions/status');
    return response.data;
  },

  cancel: async () => {
    const response = await apiClient.post('/subscriptions/cancel');
    return response.data;
  },
};

// Payments API
const paymentsAPI = {
  initiate: async (plan: string, amount: number) => {
    const response = await apiClient.post('/payments/initiate', { plan, amount });
    return response.data;
  },
};

// Validation API (for M3 integration)
const validationAPI = {
  validateAccess: async (userId: string, endpoint?: string) => {
    const response = await apiClient.post('/validate/access', { userId, endpoint });
    return response.data;
  },

  checkSubscription: async (userId: string) => {
    const response = await apiClient.get(`/validate/subscription?userId=${userId}`);
    return response.data;
  },
};

// Export all APIs
export { apiClient as default, authAPI, subscriptionsAPI, paymentsAPI, validationAPI };
