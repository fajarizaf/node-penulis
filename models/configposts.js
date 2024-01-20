'use strict';
module.exports = (sequelize, DataTypes) => {
  const configposts = sequelize.define('configposts', {
    idpost: {
        type:DataTypes.INTEGER,
        allowNull:false,
        references: {
          model: 'posts',
          key: 'id'
        }
    },
    name: DataTypes.STRING,
    value: DataTypes.STRING
  }, {});
  return configposts;
};
