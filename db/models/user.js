'use strict';
module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    firstName: DataTypes.STRING,
    revision: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0
    },
    lastName: DataTypes.STRING,
    email: DataTypes.STRING,
    age: DataTypes.INTEGER
  }, {});
  User.associate = function(models) {
    // associations can be defined here
    User.hasMany(models.Post, {
      foreignKey: 'userId'
    })
  };

  // User.Revisions = User.hasPaperTrail()

  return User;
};