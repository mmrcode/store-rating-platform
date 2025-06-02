import api from './api';

export const ratingService = {
  // Get all ratings with pagination
  getRatings: async (page = 1, limit = 10) => {
    const response = await api.get(`/ratings?page=${page}&limit=${limit}`);
    return response.data;
  },

  // Get ratings for a specific store
  getStoreRatings: async (storeId, page = 1, limit = 10) => {
    const response = await api.get(`/ratings/store/${storeId}?page=${page}&limit=${limit}`);
    return response.data;
  },

  // Submit a new rating
  submitRating: async (ratingData) => {
    const response = await api.post('/ratings', ratingData);
    return response.data;
  },

  // Update an existing rating
  updateRating: async (id, ratingData) => {
    const response = await api.put(`/ratings/${id}`, ratingData);
    return response.data;
  },

  // Delete a rating
  deleteRating: async (id) => {
    const response = await api.delete(`/ratings/${id}`);
    return response.data;
  },

  // Get rating statistics
  getRatingStats: async () => {
    const response = await api.get('/ratings/stats');
    return response.data;
  },
}; 