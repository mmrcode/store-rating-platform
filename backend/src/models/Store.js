const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const User = require('./User');

const Store = sequelize.define('Store', {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false
  },
  description: {
    type: DataTypes.TEXT
  },
  address: {
    type: DataTypes.STRING,
    allowNull: false
  },
  category: {
    type: DataTypes.STRING,
    allowNull: false
  },
  ownerId: {
    type: DataTypes.UUID,
    allowNull: false,
    references: {
      model: 'Users',
      key: 'id'
    }
  }
});

// Define associations
Store.belongsTo(User, { foreignKey: 'ownerId', as: 'owner' });

module.exports = Store; 