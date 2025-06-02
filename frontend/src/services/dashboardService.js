import api from './api';

export const dashboardService = {
  // Get overall statistics
  getStats: async () => {
    const response = await api.get('/dashboard/stats');
    return response.data;
  },

  // Get store owner statistics
  getStoreOwnerStats: async () => {
    const response = await api.get('/dashboard/store-owner-stats');
    return response.data;
  },

  // Get admin statistics
  getAdminStats: async () => {
    const response = await api.get('/dashboard/admin-stats');
    return response.data;
  },

  // Export data to CSV (admin only)
  exportToCSV: async (type) => {
    const response = await api.get(`/dashboard/export/${type}`, {
      responseType: 'blob',
    });
    return response.data;
  },
}; 