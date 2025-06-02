'use strict';
const bcrypt = require('bcryptjs');

module.exports = {
  up: async (queryInterface, Sequelize) => {
    // Create admin user
    const adminPassword = await bcrypt.hash('Admin@123', 10);
    const [admin] = await queryInterface.bulkInsert('Users', [{
      id: '11111111-1111-1111-1111-111111111111',
      name: 'System Administrator',
      email: 'admin@example.com',
      password: adminPassword,
      address: '123 Admin Street, Admin City',
      role: 'admin',
      createdAt: new Date(),
      updatedAt: new Date()
    }], { returning: true });

    // Create store owner
    const ownerPassword = await bcrypt.hash('Owner@123', 10);
    const [owner] = await queryInterface.bulkInsert('Users', [{
      id: '22222222-2222-2222-2222-222222222222',
      name: 'Store Owner',
      email: 'owner@example.com',
      password: ownerPassword,
      address: '456 Owner Street, Owner City',
      role: 'store_owner',
      createdAt: new Date(),
      updatedAt: new Date()
    }], { returning: true });

    // Create normal user
    const userPassword = await bcrypt.hash('User@123', 10);
    const [user] = await queryInterface.bulkInsert('Users', [{
      id: '33333333-3333-3333-3333-333333333333',
      name: 'Normal User',
      email: 'user@example.com',
      password: userPassword,
      address: '789 User Street, User City',
      role: 'user',
      createdAt: new Date(),
      updatedAt: new Date()
    }], { returning: true });

    // Create stores
    const stores = await queryInterface.bulkInsert('Stores', [
      {
        id: '44444444-4444-4444-4444-444444444444',
        name: 'Demo Store 1',
        email: 'store1@example.com',
        address: '123 Store Street, Store City',
        ownerId: owner.id,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: '55555555-5555-5555-5555-555555555555',
        name: 'Demo Store 2',
        email: 'store2@example.com',
        address: '456 Store Avenue, Store Town',
        ownerId: owner.id,
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ], { returning: true });

    // Create some ratings
    await queryInterface.bulkInsert('Ratings', [
      {
        id: '66666666-6666-6666-6666-666666666666',
        rating: 5,
        userId: user.id,
        storeId: stores[0].id,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: '77777777-7777-7777-7777-777777777777',
        rating: 4,
        userId: user.id,
        storeId: stores[1].id,
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ]);
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('Ratings', null, {});
    await queryInterface.bulkDelete('Stores', null, {});
    await queryInterface.bulkDelete('Users', null, {});
  }
}; 