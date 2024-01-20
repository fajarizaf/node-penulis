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
    value: DataTypes.STRING,
    createdAt: {
      type: DataTypes.DATE,
      field: 'createdAt', //in table the column name is created_at
      allowNull: false,
    },
    updatedAt: {
      type: DataTypes.DATE,
      field: 'updatedAt', //in table the column name is created_at
      allowNull: false,
    },
  }, {});
  return configposts;
};
