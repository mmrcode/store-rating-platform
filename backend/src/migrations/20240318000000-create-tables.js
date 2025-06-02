'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    // Create Users table
    await queryInterface.createTable('Users', {
      id: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
        primaryKey: true
      },
      name: {
        type: Sequelize.STRING,
        allowNull: false,
        validate: {
          len: [20, 60]
        }
      },
      email: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true,
        validate: {
          isEmail: true
        }
      },
      password: {
        type: Sequelize.STRING,
        allowNull: false
      },
      address: {
        type: Sequelize.STRING,
        allowNull: false,
        validate: {
          len: [1, 400]
        }
      },
      role: {
        type: Sequelize.ENUM('admin', 'user', 'store_owner'),
        defaultValue: 'user',
        allowNull: false
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });

    // Create Stores table
    await queryInterface.createTable('Stores', {
      id: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
        primaryKey: true
      },
      name: {
        type: Sequelize.STRING,
        allowNull: false
      },
      email: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true,
        validate: {
          isEmail: true
        }
      },
      address: {
        type: Sequelize.STRING,
        allowNull: false
      },
      ownerId: {
        type: Sequelize.UUID,
        allowNull: false,
        references: {
          model: 'Users',
          key: 'id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE'
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });

    // Create Ratings table
    await queryInterface.createTable('Ratings', {
      id: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
        primaryKey: true
      },
      rating: {
        type: Sequelize.INTEGER,
        allowNull: false,
        validate: {
          min: 1,
          max: 5
        }
      },
      userId: {
        type: Sequelize.UUID,
        allowNull: false,
        references: {
          model: 'Users',
          key: 'id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE'
      },
      storeId: {
        type: Sequelize.UUID,
        allowNull: false,
        references: {
          model: 'Stores',
          key: 'id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE'
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });

    // Add unique constraint for user-store rating
    await queryInterface.addConstraint('Ratings', {
      fields: ['userId', 'storeId'],
      type: 'unique',
      name: 'unique_user_store_rating'
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('Ratings');
    await queryInterface.dropTable('Stores');
    await queryInterface.dropTable('Users');
  }
}; 