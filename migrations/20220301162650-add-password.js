'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    return queryInterface.addColumn('users', 'password', { 
      type: Sequelize.STRING,
      defaultValue: '',
      allowNull: false,
      after: 'idroles'
    });
  },

  async down (queryInterface, Sequelize) {
    return queryInterface.removeColumn('users', 'password', {});
  }
};
