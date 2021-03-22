'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class reaction extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      this.belongsTo(models.post);
      this.belongsTo(models.user);
    }
  };
  reaction.init({
    reaction_id: {
      type: DataTypes.INTEGER,
      primaryKey : true,
      allowNull : false
    },
    user_id: {
      type: DataTypes.INTEGER,
      allowNull : false
    },
    reaction_type: {
      type : DataTypes.STRING,
      allowNull : false
    }}, {
      sequelize,
      tableName : "reactions",
      modelName: 'reaction',
    }
  ); 
  return reaction;
};