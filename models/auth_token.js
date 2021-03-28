'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class auth_token extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      this.belongsTo(models.user, { foreignKey: "user_id" });
    }
  };
  auth_token.init({
    token: {
      type: DataTypes.STRING(1000),
      allowNull: false
    }
  }, {
    sequelize,
    modelName: 'auth_token',
  });
  return auth_token;
};