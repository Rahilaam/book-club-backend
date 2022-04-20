"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class thread extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      thread.belongsTo(models.bookClub);
      thread.hasMany(models.comment);
    }
  }
  thread.init(
    {
      topic: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "thread",
    }
  );
  return thread;
};
