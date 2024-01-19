'use strict';

const fs = require('fs');
const path = require('path');
const pg = require('pg');

const Sequelize = require('sequelize');
const basename = path.basename(__filename);
const db = {};

let sequelize;

// connect to db vercel app
sequelize = new Sequelize(process.env.DATABASE_URL, {
  dialect:  'postgres',
  dialectModule: pg,
  dialectOptions: {
    ssl: {
        require: true,
        rejectUnauthorized: false
    }
  }
});

fs
  .readdirSync(__dirname)
  .filter(file => {
    return (file.indexOf('.') !== 0) && (file !== basename) && (file.slice(-3) === '.js');
  })
  .forEach(file => {
    const model = require(path.join(__dirname, file))(sequelize, Sequelize.DataTypes);
    db[model.name] = model;
  });

Object.keys(db).forEach(modelName => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;
