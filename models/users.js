'use strict';
module.exports = (sequelize, DataTypes) => {
  const users = sequelize.define('users', {
    nameuser: {
      type:DataTypes.STRING,
      validate: {
        notEmpty:true
      }
    },
    emailuser: {
      type:DataTypes.STRING,
      validate: {
        isEmail:true,
        notEmpty:true
      }
    },
    idroles:{
      type: DataTypes.INTEGER,
      references: {
        model: 'roles',
        key: 'id'
      },
      validate: {
        notEmpty:true
      }
    },
    password: {
      type: DataTypes.STRING,
      validate: {
        notEmpty:true,
        min:8
      }
    },
    token:DataTypes.STRING
  }, {});
  users.associate = function(models) {
    
  };
  return users;
};
