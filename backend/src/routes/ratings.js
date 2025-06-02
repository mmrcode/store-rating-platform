const express = require('express');
const { body, validationResult } = require('express-validator');
const { Rating, Store, User } = require('../models');
const { auth, authorize } = require('../middleware/auth');

const router = express.Router();

// Submit or update rating (normal users only)
router.post('/',
  auth,
  authorize('user'),
  [
    body('storeId').isUUID(),
    body('rating').isInt({ min: 1, max: 5 })
  ],
  async (req, res) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }

      const { storeId, rating } = req.body;

      // Check if store exists
      const store = await Store.findByPk(storeId);
      if (!store) {
        return res.status(404).json({ message: 'Store not found' });
      }

      // Check if user has already rated this store
      let userRating = await Rating.findOne({
        where: {
          userId: req.user.id,
          storeId
        }
      });

      if (userRating) {
        // Update existing rating
        await userRating.update({ rating });
      } else {
        // Create new rating
        userRating = await Rating.create({
          userId: req.user.id,
          storeId,
          rating
        });
      }

      res.json(userRating);
    } catch (error) {
      res.status(500).json({ message: 'Error submitting rating', error: error.message });
    }
  }
);

// Get store ratings (for store owner)
router.get('/store/:storeId',
  auth,
  async (req, res) => {
    try {
      const { storeId } = req.params;

      // Check if store exists
      const store = await Store.findByPk(storeId);
      if (!store) {
        return res.status(404).json({ message: 'Store not found' });
      }

      // Check if user is admin or store owner
      if (req.user.role !== 'admin' && store.ownerId !== req.user.id) {
        return res.status(403).json({ message: 'Not authorized to view these ratings' });
      }

      const ratings = await Rating.findAll({
        where: { storeId },
        include: [
          {
            model: User,
            attributes: ['id', 'name']
          }
        ],
        order: [['createdAt', 'DESC']]
      });

      res.json(ratings);
    } catch (error) {
      res.status(500).json({ message: 'Error fetching ratings', error: error.message });
    }
  }
);

// Get user's ratings
router.get('/user',
  auth,
  async (req, res) => {
    try {
      const ratings = await Rating.findAll({
        where: { userId: req.user.id },
        include: [
          {
            model: Store,
            attributes: ['id', 'name', 'address']
          }
        ],
        order: [['createdAt', 'DESC']]
      });

      res.json(ratings);
    } catch (error) {
      res.status(500).json({ message: 'Error fetching ratings', error: error.message });
    }
  }
);

// Delete rating (admin only)
router.delete('/:id',
  auth,
  authorize('admin'),
  async (req, res) => {
    try {
      const rating = await Rating.findByPk(req.params.id);
      if (!rating) {
        return res.status(404).json({ message: 'Rating not found' });
      }

      await rating.destroy();
      res.json({ message: 'Rating deleted successfully' });
    } catch (error) {
      res.status(500).json({ message: 'Error deleting rating', error: error.message });
    }
  }
);

// Basic route for testing
router.get('/test', (req, res) => {
  res.json({ message: 'Ratings routes working' });
});

module.exports = router; 