import React, { createContext, useContext, useState, useEffect } from 'react';
import { authAPI } from '../services/api';
import { toast } from 'sonner';

const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [token, setToken] = useState(null);

  useEffect(() => {
    // Check if user is already logged in
    const storedToken = localStorage.getItem('authToken');
    const storedUser = localStorage.getItem('user');

    if (storedToken && storedUser) {
      setToken(storedToken);
      setUser(JSON.parse(storedUser));
    }
    setLoading(false);
  }, []);

  const login = async (credentials, role) => {
    try {
      setLoading(true);
      let response;
      
      switch (role) {
        case 'donor':
          response = await authAPI.loginDonor(credentials);
          break;
        case 'volunteer':
          response = await authAPI.loginVolunteer(credentials);
          break;
        case 'admin':
          response = await authAPI.loginAdmin(credentials);
          break;
        default:
          throw new Error('Invalid role');
      }

      setUser(response.data.user);
      setToken(response.token);
      toast.success(`Welcome back, ${response.data.user.name}!`);
      
      return response;
    } catch (error) {
      toast.error(error.response?.data?.message || 'Login failed');
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const signup = async (userData, role) => {
    try {
      setLoading(true);
      let response;
      
      switch (role) {
        case 'donor':
          response = await authAPI.signupDonor(userData);
          break;
        case 'volunteer':
          response = await authAPI.signupVolunteer(userData);
          break;
        case 'admin':
          response = await authAPI.signupAdmin(userData);
          break;
        default:
          throw new Error('Invalid role');
      }

      setUser(response.data.user);
      setToken(response.token);
      toast.success(`Account created successfully! Welcome, ${response.data.user.name}!`);
      
      return response;
    } catch (error) {
      toast.error(error.response?.data?.message || 'Signup failed');
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const logout = async () => {
    try {
      await authAPI.logout();
    } catch (error) {
      console.error('Logout error:', error);
    } finally {
      setUser(null);
      setToken(null);
      localStorage.removeItem('authToken');
      localStorage.removeItem('user');
      toast.success('Logged out successfully');
    }
  };

  const updateUser = async (userData) => {
    try {
      const response = await authAPI.updateProfile(userData, user?.role);
      setUser(response.data.user);
      localStorage.setItem('user', JSON.stringify(response.data.user));
      toast.success('Profile updated successfully');
      return response;
    } catch (error) {
      toast.error(error.response?.data?.message || 'Profile update failed');
      throw error;
    }
  };

  const updatePassword = async (passwordData) => {
    try {
      await authAPI.updatePassword(
        passwordData.currentPassword,
        passwordData.password,
        passwordData.passwordConfirm,
        user?.role
      );
      toast.success('Password updated successfully');
    } catch (error) {
      toast.error(error.response?.data?.message || 'Password update failed');
      throw error;
    }
  };

  const forgotPassword = async (email, role = 'donor') => {
    try {
      await authAPI.forgotPassword(email, role);
      toast.success('Password reset link sent to your email');
    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed to send reset link');
      throw error;
    }
  };

  const resetPassword = async (token, password, passwordConfirm, role = 'donor') => {
    try {
      const response = await authAPI.resetPassword(token, password, passwordConfirm, role);
      setUser(response.data.user);
      setToken(response.token);
      toast.success('Password reset successfully');
      return response;
    } catch (error) {
      toast.error(error.response?.data?.message || 'Password reset failed');
      throw error;
    }
  };

  const value = {
    user,
    token,
    loading,
    login,
    signup,
    logout,
    updateUser,
    updatePassword,
    forgotPassword,
    resetPassword,
    isAuthenticated: !!user && !!token,
    isDonor: user?.role === 'donor',
    isVolunteer: user?.role === 'volunteer',
    isAdmin: user?.role === 'admin',
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};
