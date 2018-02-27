'use strict';
module.exports = (sequelize, DataTypes) => {
  var users = sequelize.define('users', {
    userName: DataTypes.STRING,
    responses: DataTypes.JSONB,
    score: DataTypes.INTEGER
  }, {});
  users.associate = function(models) {
    // associations can be defined here
  };
  return users;
};