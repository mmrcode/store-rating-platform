const express = require('express');
const { User, Store, Rating } = require('../models');
const { auth, authorize } = require('../middleware/auth');
const { sequelize } = require('../config/database');
const { createObjectCsvWriter } = require('csv-writer');
const path = require('path');
const logger = require('../utils/logger');

const router = express.Router();

// Get admin dashboard statistics
router.get('/admin',
  auth,
  authorize('admin'),
  async (req, res) => {
    try {
      const totalUsers = await User.count();
      const totalStores = await Store.count();
      const totalRatings = await Rating.count();
      const averageRating = await Rating.findAll({
        attributes: [[sequelize.fn('AVG', sequelize.col('rating')), 'average']],
        raw: true,
      });

      const ratingDistribution = await Rating.findAll({
        attributes: [
          'rating',
          [sequelize.fn('COUNT', sequelize.col('id')), 'count'],
        ],
        group: ['rating'],
        order: [['rating', 'ASC']],
      });

      res.json({
        totalUsers,
        totalStores,
        totalRatings,
        averageRating: parseFloat(averageRating[0].average) || 0,
        ratingDistribution,
      });
    } catch (error) {
      logger.error('Error fetching admin dashboard stats:', error);
      res.status(500).json({ message: 'Error fetching dashboard statistics' });
    }
  }
);

// Get store owner dashboard statistics
router.get('/store-owner',
  auth,
  authorize('store_owner'),
  async (req, res) => {
    try {
      const stores = await Store.findAll({
        where: { ownerId: req.user.id },
        include: [
          {
            model: Rating,
            attributes: ['rating']
          }
        ]
      });

      const storeStats = await Promise.all(stores.map(async (store) => {
        const ratings = store.Ratings;
        const averageRating = ratings.length > 0
          ? ratings.reduce((acc, curr) => acc + curr.rating, 0) / ratings.length
          : 0;

        return {
          storeId: store.id,
          storeName: store.name,
          totalRatings: ratings.length,
          averageRating
        };
      }));

      res.json({
        totalStores: stores.length,
        storeStats
      });
    } catch (error) {
      res.status(500).json({ message: 'Error fetching store owner statistics', error: error.message });
    }
  }
);

// Get user dashboard statistics
router.get('/user',
  auth,
  authorize('user'),
  async (req, res) => {
    try {
      const ratings = await Rating.findAll({
        where: { userId: req.user.id },
        include: [
          {
            model: Store,
            attributes: ['id', 'name', 'address']
          }
        ]
      });

      res.json({
        totalRatings: ratings.length,
        ratings
      });
    } catch (error) {
      res.status(500).json({ message: 'Error fetching user statistics', error: error.message });
    }
  }
);

// Export data to CSV
router.get('/export/:type', auth, authorize('admin'), async (req, res) => {
  try {
    const { type } = req.params;
    const exportPath = path.join(__dirname, '../../exports');
    const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
    const filename = `${type}-${timestamp}.csv`;

    let data;
    let headers;

    switch (type) {
      case 'users':
        data = await User.findAll({
          attributes: ['id', 'name', 'email', 'address', 'role', 'createdAt'],
        });
        headers = [
          { id: 'id', title: 'ID' },
          { id: 'name', title: 'Name' },
          { id: 'email', title: 'Email' },
          { id: 'address', title: 'Address' },
          { id: 'role', title: 'Role' },
          { id: 'createdAt', title: 'Created At' },
        ];
        break;

      case 'stores':
        data = await Store.findAll({
          attributes: ['id', 'name', 'email', 'address', 'createdAt'],
          include: [
            {
              model: User,
              attributes: ['name'],
              as: 'owner',
            },
          ],
        });
        headers = [
          { id: 'id', title: 'ID' },
          { id: 'name', title: 'Store Name' },
          { id: 'email', title: 'Email' },
          { id: 'address', title: 'Address' },
          { id: 'owner.name', title: 'Owner' },
          { id: 'createdAt', title: 'Created At' },
        ];
        break;

      case 'ratings':
        data = await Rating.findAll({
          attributes: ['id', 'rating', 'createdAt'],
          include: [
            {
              model: User,
              attributes: ['name'],
            },
            {
              model: Store,
              attributes: ['name'],
            },
          ],
        });
        headers = [
          { id: 'id', title: 'ID' },
          { id: 'rating', title: 'Rating' },
          { id: 'user.name', title: 'User' },
          { id: 'store.name', title: 'Store' },
          { id: 'createdAt', title: 'Created At' },
        ];
        break;

      default:
        return res.status(400).json({ message: 'Invalid export type' });
    }

    const csvWriter = createObjectCsvWriter({
      path: path.join(exportPath, filename),
      header: headers,
    });

    await csvWriter.writeRecords(data);

    res.download(path.join(exportPath, filename), filename, (err) => {
      if (err) {
        logger.error('Error downloading file:', err);
        res.status(500).json({ message: 'Error downloading file' });
      }
    });
  } catch (error) {
    logger.error('Error exporting data:', error);
    res.status(500).json({ message: 'Error exporting data' });
  }
});

// Basic route for testing
router.get('/test', (req, res) => {
  res.json({ message: 'Dashboard routes working' });
});

module.exports = router; 