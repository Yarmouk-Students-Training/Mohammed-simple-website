'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class post extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      this.belongsTo(models.user);
      this.hasMany(models.reaction, { foreignKey: "post_id" } );
      this.hasMany(models.comment, { foreignKey: "post_id" } );
    }
  };
  post.init({
    post_id: {
      type : DataTypes.INTEGER,
      primaryKey: true,
      foreignKey: true,
      autoIncrement: true
    }, 
    content: {
      type : DataTypes.STRING,
      allowNull : false,
    },
    numofreactions: {
      type: DataTypes.INTEGER,
      allowNull : false
    },
    numofcomments: {
      type : DataTypes.INTEGER,
      allowNull : false
    }
    }, {
    sequelize,
    tableName: "posts",
    modelName: 'post',
  });
  return post;
};