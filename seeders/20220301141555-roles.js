'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    return queryInterface.bulkInsert('roles', [
      { 
        rolesname: 'Administrator',
        createdAt: Date.datenow(),
        updatedAt: Date.datenow(),
      },
      { 
        rolesname: 'Contributor',
        createdAt: Date.datenow(),
        updatedAt: Date.datenow(),
      }
    ]);
  },

  async down (queryInterface, Sequelize) {
    return queryInterface.bulkDelete('roles', null, {});
  }
};
