import api from './api';

export const userService = {
  // Get all users with pagination (admin only)
  getUsers: async (page = 1, limit = 10) => {
    const response = await api.get(`/users?page=${page}&limit=${limit}`);
    return response.data;
  },

  // Get user by ID
  getUser: async (id) => {
    const response = await api.get(`/users/${id}`);
    return response.data;
  },

  // Get current user profile
  getCurrentUser: async () => {
    const response = await api.get('/users/me');
    return response.data;
  },

  // Update user profile
  updateUser: async (id, userData) => {
    const response = await api.put(`/users/${id}`, userData);
    return response.data;
  },

  // Delete user (admin only)
  deleteUser: async (id) => {
    const response = await api.delete(`/users/${id}`);
    return response.data;
  },

  // Change password
  changePassword: async (passwordData) => {
    const response = await api.post('/users/change-password', passwordData);
    return response.data;
  },

  // Request password reset
  requestPasswordReset: async (email) => {
    const response = await api.post('/users/request-password-reset', { email });
    return response.data;
  },

  // Reset password with token
  resetPassword: async (token, newPassword) => {
    const response = await api.post('/users/reset-password', {
      token,
      newPassword,
    });
    return response.data;
  },
}; 