'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.addColumn(
      'Stocks',
      'timesQueried',
      {
        type: Sequelize.INTEGER,
        defaultValue: 0
      }
    )
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.removeColumn(
      'Stocks',
      'timesQueried'
    )
  }
};
