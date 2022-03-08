'use strict';
const Date = require('../src/functions/date')

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('users', [
      { 
        nameuser: 'Fajar Riza Fauzi',
        emailuser: 'fajarizaf@gmail.com',
        idroles: 1,
        createdAt: Date.datenow(),
        updatedAt: Date.datenow(),
      }
    ]);
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('users', null, {});
  }
};
