'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    return queryInterface.addColumn('users', 'idroles', { 
      type: Sequelize.INTEGER,
      defaultValue: 1,
      allowNull: false,
      after: 'emailuser'
    });
  },

  async down (queryInterface, Sequelize) {
    return queryInterface.removeColumn('users', 'idroles', {});
  }
};
