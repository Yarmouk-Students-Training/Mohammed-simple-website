'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class relation extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      this.belongsTo(models.user, { foreignKey:"user_one" });
      this.belongsTo(models.user, { foreignKey:"user_two" });
    }
  };
  relation.init({
    relation_id: {
      type: DataTypes.INTEGER,
      primaryKey:true,
      allowNull : false
    },
    user_one: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    user_two: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    relation_type: {
      type : DataTypes.STRING,
      allowNull: false
    }
  }, {
    sequelize,
    tableName : "relations",
    modelName: 'relation',
  });
  return relation;
};