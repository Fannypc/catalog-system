'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert('Categories', [
      {
       name: 'Hair Care',
       createdAt: new Date(),
       updatedAt: new Date()
      }, {
        name: 'Beverages',
        createdAt: new Date(),
        updatedAt: new Date()
      }, {
        name: 'Personal Wash',
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ], {});
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Categories', null, {});
  }
};
