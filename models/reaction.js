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
      this.belongsTo(models.post, { foreignKey: "post_id" } );
      this.belongsTo(models.user, { foreignKey: "user_id" });
    }
  };
  reaction.init({
    reaction_id: {
      type: DataTypes.INTEGER,
      primaryKey : true,
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