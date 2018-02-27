'use strict';
module.exports = (sequelize, DataTypes) => {
  var questions = sequelize.define('questions', {
    question: DataTypes.STRING,
    questionId: DataTypes.INTEGER,
    options: DataTypes.JSONB,
    answer: DataTypes.STRING
  }, {});
  questions.associate = function(models) {
    // associations can be defined here
  };
  return questions;
};