'use strict';

const fs = require('fs');
const path = require('path');
const Sequelize = require('sequelize');
const basename = path.basename(__filename);
const env = process.env.NODE_ENV || 'development';
const config = require(__dirname + '/../config/config.json')[env];
const db = {};

let sequelize;
if (process.env.DATABASE_URL) {
  // the application is executed on Heroku 
  sequelize = new Sequelize(process.env.DATABASE_URL, {
    dialect:  'mysql',
    protocol: 'mysql',
    logging:  true //false
  });
} else {
  // the application is executed on the local machine
  sequelize = new Sequelize("mysql://jvsy0cv7xondxqfj:e7wp2cn265n6q1vg@dno6xji1n8fm828n.cbetxkdyhwsb.us-east-1.rds.amazonaws.com:3306/vjgt9pquv3ly7e4x");
}

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
