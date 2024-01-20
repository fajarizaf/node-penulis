'use strict';
module.exports = (sequelize, DataTypes) => {
  const posts = sequelize.define('posts', {
    titlepost: DataTypes.STRING,
    contentpost: DataTypes.TEXT,
    catpost: {
        type:DataTypes.INTEGER,
        allowNull:false,
        references: {
          model: 'catposts',
          key: 'id'
        }
    },
    tagpost: DataTypes.TEXT,
    authorpost: {
        type: DataTypes.INTEGER,
        allowNull:false,
        references: {
          model: "users",
          key: 'id'
        }
    },
    slugpost: DataTypes.STRING,
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
  posts.associate = function(models) {
    posts.belongsTo(models.catposts, {foreignKey: 'catpost', as: 'categori'})
    posts.belongsTo(models.users, {foreignKey: 'authorpost', as: 'author'})
    posts.hasMany(models.configposts, {foreignKey: 'idpost', as: 'config'})
  };
  return posts;
};
