const express = require('express');
const { body, validationResult } = require('express-validator');
const { Store, User, Rating } = require('../models');
const { auth, authorize } = require('../middleware/auth');
const { Op } = require('sequelize');

const router = express.Router();

// Get all stores (with optional filters and pagination)
router.get('/', auth, async (req, res) => {
  try {
    const { name, address, page = 1, limit = 10 } = req.query;
    const where = {};

    if (name) {
      where.name = { [Op.iLike]: `%${name}%` };
    }
    if (address) {
      where.address = { [Op.iLike]: `%${address}%` };
    }

    const offset = (page - 1) * limit;

    const { count, rows: stores } = await Store.findAndCountAll({
      where,
      include: [
        {
          model: Rating,
          attributes: ['rating'],
        }
      ],
      attributes: {
        include: [
          [
            sequelize.fn('AVG', sequelize.col('Ratings.rating')),
            'averageRating'
          ]
        ]
      },
      group: ['Store.id', 'Ratings.id'],
      limit: parseInt(limit),
      offset: parseInt(offset),
      order: [['createdAt', 'DESC']]
    });

    res.json({
      stores,
      currentPage: parseInt(page),
      totalPages: Math.ceil(count / limit),
      totalStores: count
    });
  } catch (error) {
    res.status(500).json({ message: 'Error fetching stores', error: error.message });
  }
});

// Create new store (admin only)
router.post('/',
  auth,
  authorize('admin'),
  [
    body('name').notEmpty(),
    body('email').isEmail(),
    body('address').notEmpty(),
    body('ownerId').isUUID()
  ],
  async (req, res) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }

      const { name, email, address, ownerId } = req.body;

      // Check if owner exists and is a store owner
      const owner = await User.findOne({
        where: { id: ownerId, role: 'store_owner' }
      });

      if (!owner) {
        return res.status(400).json({ message: 'Invalid store owner' });
      }

      const store = await Store.create({
        name,
        email,
        address,
        ownerId
      });

      res.status(201).json(store);
    } catch (error) {
      res.status(500).json({ message: 'Error creating store', error: error.message });
    }
  }
);

// Get store details
router.get('/:id', auth, async (req, res) => {
  try {
    const store = await Store.findByPk(req.params.id, {
      include: [
        {
          model: User,
          as: 'owner',
          attributes: ['id', 'name', 'email']
        },
        {
          model: Rating,
          include: [
            {
              model: User,
              attributes: ['id', 'name']
            }
          ]
        }
      ]
    });

    if (!store) {
      return res.status(404).json({ message: 'Store not found' });
    }

    res.json(store);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching store', error: error.message });
  }
});

// Update store (admin or store owner)
router.put('/:id',
  auth,
  [
    body('name').optional().notEmpty(),
    body('email').optional().isEmail(),
    body('address').optional().notEmpty()
  ],
  async (req, res) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }

      const store = await Store.findByPk(req.params.id);
      if (!store) {
        return res.status(404).json({ message: 'Store not found' });
      }

      // Check if user is admin or store owner
      if (req.user.role !== 'admin' && store.ownerId !== req.user.id) {
        return res.status(403).json({ message: 'Not authorized to update this store' });
      }

      await store.update(req.body);
      res.json(store);
    } catch (error) {
      res.status(500).json({ message: 'Error updating store', error: error.message });
    }
  }
);

// Delete store (admin only)
router.delete('/:id',
  auth,
  authorize('admin'),
  async (req, res) => {
    try {
      const store = await Store.findByPk(req.params.id);
      if (!store) {
        return res.status(404).json({ message: 'Store not found' });
      }

      await store.destroy();
      res.json({ message: 'Store deleted successfully' });
    } catch (error) {
      res.status(500).json({ message: 'Error deleting store', error: error.message });
    }
  }
);

// Basic route for testing
router.get('/test', (req, res) => {
  res.json({ message: 'Stores routes working' });
});

module.exports = router; 