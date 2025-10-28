import axios from 'axios';
import { toast } from 'sonner';

// Resolve API base URL dynamically for dev/prod
const isBrowser = typeof window !== 'undefined';
const isLocalVite =
  isBrowser &&
  (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1') &&
  window.location.port === '5173';

const apiBaseURL =
  (import.meta && import.meta.env && import.meta.env.VITE_API_BASE_URL)
    ? import.meta.env.VITE_API_BASE_URL.replace(/\/$/, '')
    : (isLocalVite ? 'http://localhost:3000/api/v1' : '/api/v1');

// Create axios instance with base configuration
const api = axios.create({
  baseURL: apiBaseURL,
  timeout: 10000,
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor to add auth token
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('authToken');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor to handle errors
api.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    if (error.response?.status === 401) {
      // Token expired or invalid
      localStorage.removeItem('authToken');
      localStorage.removeItem('user');
      window.location.href = '/login';
      toast.error('Session expired. Please login again.');
    } else if (error.response?.status >= 500) {
      toast.error('Server error. Please try again later.');
    } else if (error.response?.data?.message) {
      toast.error(error.response.data.message);
    } else if (error.message) {
      toast.error(error.message);
    }
    return Promise.reject(error);
  }
);

// Auth API
export const authAPI = {
  // Donor Auth
  signupDonor: async (userData) => {
    const response = await api.post('/donors/signup', userData);
    if (response.data.token) {
      localStorage.setItem('authToken', response.data.token);
      localStorage.setItem('user', JSON.stringify(response.data.data.user));
    }
    return response.data;
  },

  loginDonor: async (credentials) => {
    const response = await api.post('/donors/login', credentials);
    if (response.data.token) {
      localStorage.setItem('authToken', response.data.token);
      localStorage.setItem('user', JSON.stringify(response.data.data.user));
    }
    return response.data;
  },

  // Volunteer Auth
  signupVolunteer: async (userData) => {
    const response = await api.post('/volunteers/signup', userData);
    if (response.data.token) {
      localStorage.setItem('authToken', response.data.token);
      localStorage.setItem('user', JSON.stringify(response.data.data.user));
    }
    return response.data;
  },

  loginVolunteer: async (credentials) => {
    const response = await api.post('/volunteers/login', credentials);
    if (response.data.token) {
      localStorage.setItem('authToken', response.data.token);
      localStorage.setItem('user', JSON.stringify(response.data.data.user));
    }
    return response.data;
  },

  // Admin Auth
  signupAdmin: async (userData) => {
    const response = await api.post('/admins/signup', userData);
    if (response.data.token) {
      localStorage.setItem('authToken', response.data.token);
      localStorage.setItem('user', JSON.stringify(response.data.data.user));
    }
    return response.data;
  },

  loginAdmin: async (credentials) => {
    const response = await api.post('/admins/login', credentials);
    if (response.data.token) {
      localStorage.setItem('authToken', response.data.token);
      localStorage.setItem('user', JSON.stringify(response.data.data.user));
    }
    return response.data;
  },

  // Common Auth
  logout: async () => {
    const response = await api.get('/users/logout');
    localStorage.removeItem('authToken');
    localStorage.removeItem('user');
    return response.data;
  },

  forgotPassword: async (email, role = 'donor') => {
    const endpoint = role === 'admin' ? '/admins' : 
                    role === 'volunteer' ? '/volunteers' : '/donors';
    return await api.post(`${endpoint}/forgotPassword`, { email });
  },

  resetPassword: async (token, password, passwordConfirm, role = 'donor') => {
    const endpoint = role === 'admin' ? '/admins' : 
                    role === 'volunteer' ? '/volunteers' : '/donors';
    return await api.patch(`${endpoint}/resetPassword/${token}`, {
      password,
      passwordConfirm
    });
  },

  updatePassword: async (currentPassword, password, passwordConfirm, role = 'donor') => {
    const endpoint = role === 'admin' ? '/admins' : 
                    role === 'volunteer' ? '/volunteers' : '/donors';
    return await api.patch(`${endpoint}/updateMyPassword`, {
      currentPassword,
      password,
      passwordConfirm
    });
  },

  getCurrentUser: async () => {
    return await api.get('/users/me');
  },

  updateProfile: async (userData, role = 'donor') => {
    const endpoint = role === 'admin' ? '/admins' : 
                    role === 'volunteer' ? '/volunteers' : '/donors';
    return await api.patch(`${endpoint}/updateMe`, userData);
  }
};

// Food API
export const foodAPI = {
  addFoodItem: async (foodData) => {
    return await api.post('/food/add', foodData);
  },

  getAllFood: async (params = {}) => {
    const queryString = new URLSearchParams(params).toString();
    return await api.get(`/food/getAllFood${queryString ? `?${queryString}` : ''}`);
  },

  claimFood: async (foodId) => {
    return await api.patch(`/food/claim/${foodId}`);
  },

  completePickup: async (foodId) => {
    return await api.patch(`/food/complete/${foodId}`);
  },

  getFoodById: async (foodId) => {
    return await api.get(`/food/${foodId}`);
  },

  updateFoodStatus: async (foodId, status) => {
    return await api.patch(`/food/status/${foodId}`, { status });
  },

  getFoodByDonor: async (donorId) => {
    return await api.get(`/food/donor/${donorId}`);
  },

  getFoodByVolunteer: async (volunteerId) => {
    return await api.get(`/food/volunteer/${volunteerId}`);
  }
};

// User Management API
export const userAPI = {
  getAllUsers: async (role = null) => {
    const params = role ? { role } : {};
    const queryString = new URLSearchParams(params).toString();
    return await api.get(`/users${queryString ? `?${queryString}` : ''}`);
  },

  getUserById: async (userId) => {
    return await api.get(`/users/${userId}`);
  },

  updateUser: async (userId, userData) => {
    return await api.patch(`/users/${userId}`, userData);
  },

  deleteUser: async (userId) => {
    return await api.delete(`/users/${userId}`);
  },

  // Donor specific
  getAllDonors: async () => {
    return await api.get('/donors');
  },

  getDonor: async (donorId) => {
    return await api.get(`/donors/${donorId}`);
  },

  updateDonor: async (donorId, donorData) => {
    return await api.patch(`/donors/${donorId}`, donorData);
  },

  deleteDonor: async (donorId) => {
    return await api.delete(`/donors/${donorId}`);
  },

  // Volunteer specific
  getAllVolunteers: async () => {
    return await api.get('/volunteers');
  },

  getVolunteer: async (volunteerId) => {
    return await api.get(`/volunteers/${volunteerId}`);
  },

  updateVolunteer: async (volunteerId, volunteerData) => {
    return await api.patch(`/volunteers/${volunteerId}`, volunteerData);
  },

  deleteVolunteer: async (volunteerId) => {
    return await api.delete(`/volunteers/${volunteerId}`);
  }
};

// Analytics API
export const analyticsAPI = {
  getDashboardStats: async (role) => {
    return await api.get(`/analytics/dashboard/${role}`);
  },

  getFoodDistributionStats: async () => {
    return await api.get('/analytics/food-distribution');
  },

  getUserStats: async () => {
    return await api.get('/analytics/users');
  },

  getMonthlyStats: async (month, year) => {
    return await api.get(`/analytics/monthly?month=${month}&year=${year}`);
  }
};

// Notifications API
export const notificationAPI = {
  getNotifications: async () => {
    return await api.get('/notifications');
  },

  markAsRead: async (notificationId) => {
    return await api.patch(`/notifications/${notificationId}/read`);
  },

  markAllAsRead: async () => {
    return await api.patch('/notifications/mark-all-read');
  },

  createNotification: async (notificationData) => {
    return await api.post('/notifications', notificationData);
  }
};

// Location API
export const locationAPI = {
  geocodeAddress: async (address) => {
    return await api.post('/location/geocode', { address });
  },

  getNearbyVolunteers: async (lat, lng, radius = 10) => {
    return await api.get(`/location/volunteers?lat=${lat}&lng=${lng}&radius=${radius}`);
  },

  getNearbyNGOs: async (lat, lng, radius = 10) => {
    return await api.get(`/location/ngos?lat=${lat}&lng=${lng}&radius=${radius}`);
  },

  updateUserLocation: async (lat, lng) => {
    return await api.patch('/location/update', { lat, lng });
  }
};

// File Upload API
export const uploadAPI = {
  uploadImage: async (file, type = 'food') => {
    const formData = new FormData();
    formData.append('image', file);
    formData.append('type', type);
    
    return await api.post('/upload/image', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
  },

  uploadMultipleImages: async (files, type = 'food') => {
    const formData = new FormData();
    files.forEach((file, index) => {
      formData.append(`images`, file);
    });
    formData.append('type', type);
    
    return await api.post('/upload/images', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
  }
};

// Real-time API (WebSocket)
export const socketAPI = {
  connect: () => {
    const { io } = require('socket.io-client');
    const socketURL =
      (import.meta && import.meta.env && import.meta.env.VITE_SOCKET_URL)
        ? import.meta.env.VITE_SOCKET_URL
        : (isLocalVite ? 'http://localhost:3000' : (isBrowser ? window.location.origin : 'http://localhost:3000'));
    return io(socketURL, {
      withCredentials: true,
    });
  },

  emitLocationUpdate: (socket, volunteerId, lat, lng) => {
    socket.emit('volunteerLocationUpdate', {
      volunteerId,
      lat,
      lng
    });
  },

  onLocationBroadcast: (socket, callback) => {
    socket.on('volunteerLocationBroadcast', callback);
  }
};

export default api;
