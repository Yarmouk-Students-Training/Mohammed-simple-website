'use strict';
const {
  Model
} = require('sequelize');
const post = require('./post');
module.exports = (sequelize, DataTypes) => {
  class user extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      this.hasMany(models.post, { foreignKey: "user_id" }); // 1 User has many Posts
      this.hasMany(models.reaction, { foreignKey: "user_id" }); // 1 User has many Reactions
      this.hasMany(models.comment, { foreignKey: "user_id" }); // 1 User has many Comments
      this.belongsToMany(models.user, { as: "user_one" , through : models.relation });
      this.belongsToMany(models.user, { as: "user_two" , through : models.relation });
    }
  };
  user.init({
    user_id:{
      type : DataTypes.INTEGER,
      primaryKey : true,
      foreignKey : true,
      autoIncrement: true
    },
    username: {
      type : DataTypes.STRING,
      allowNull : false
    },
    password: {
      type : DataTypes.STRING,
      allowNull : false
    },
    email: {
      type : DataTypes.STRING,
      allowNull : false
    },
    first_name: {
      type : DataTypes.STRING,
      allowNull : false
    },
    last_name: {
      type : DataTypes.STRING,
      allowNull : false
    }
  }, {
    sequelize,
    tableName:"users",
    modelName: 'user',
  });
  return user;
};