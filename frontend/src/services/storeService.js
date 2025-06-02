import api from './api';

export const storeService = {
  // Get all stores with pagination
  getStores: async (page = 1, limit = 10) => {
    const response = await api.get(`/stores?page=${page}&limit=${limit}`);
    return response.data;
  },

  // Get store by ID
  getStore: async (id) => {
    const response = await api.get(`/stores/${id}`);
    return response.data;
  },

  // Create new store (store owner only)
  createStore: async (storeData) => {
    const response = await api.post('/stores', storeData);
    return response.data;
  },

  // Update store (store owner only)
  updateStore: async (id, storeData) => {
    const response = await api.put(`/stores/${id}`, storeData);
    return response.data;
  },

  // Delete store (store owner only)
  deleteStore: async (id) => {
    const response = await api.delete(`/stores/${id}`);
    return response.data;
  },

  // Get store statistics
  getStoreStats: async () => {
    const response = await api.get('/stores/stats');
    return response.data;
  },
}; 