'use strict';
const {
  Model
} = require('sequelize');
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
      // define the relation association
      this.belongsToMany(this, { through: models.relation, as: "user_one", foreignKey : "user_two" });
    }
  };
  user.init({
    user_id:{
      type : DataTypes.INTEGER,
      primaryKey : true,
      autoIncrement: true
    },
    username: {
      type : DataTypes.STRING,
      allowNull : false,
      unique: true
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