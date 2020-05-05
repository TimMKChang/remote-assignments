'use strict';
module.exports = (sequelize, DataTypes) => {
  const User_without_unique_key = sequelize.define('User_without_unique_key', {
    email: DataTypes.STRING,
    password: DataTypes.STRING
  }, {
    freezeTableName: true
  });
  User_without_unique_key.associate = function (models) {
    // associations can be defined here
  };
  return User_without_unique_key;
};