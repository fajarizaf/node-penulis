'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    return queryInterface.removeColumn('users', 'titleuser', {});
  },

  async down (queryInterface, Sequelize) {
    return queryInterface.addColumn('users', 'titleuser', { 
      type: Sequelize.INTEGER,
      defaultValue: 1,
      allowNull: false
    });
  }
};
