'use strict';
const Date = require('../src/functions/date')

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('catposts', [
      { 
        namecat: 'React', 
        createdAt: Date.datenow(), 
        updatedAt: Date.datenow() 
      },
      { 
        namecat: 'React Native', 
        createdAt: Date.datenow(), 
        updatedAt: Date.datenow() 
      }
    ]);
  },
  down: async (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('catposts', null, {});
  }
};
