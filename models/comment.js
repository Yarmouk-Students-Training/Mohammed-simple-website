'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class comment extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      this.belongsTo(models.post , { foreignKey: "post_id" } );
      this.belongsTo(models.user, { foreignKey: "user_id" });
    }
  };
  comment.init({
    comment_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      allowNull: false
    },
    content: {
      type: DataTypes.STRING,
      allowNull : false
    }
  }, {
    sequelize,
    tableName: "comments",
    modelName: 'comment',
  });
  return comment;
};