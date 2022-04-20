"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class bookClub extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      bookClub.belongsTo(models.user, { foreignKey: "ownerId", as: "owner" });
      bookClub.belongsToMany(models.user, {
        through: "participants",
        foreignKey: "bookClubId",
        as: "participant",
      });
      bookClub.belongsTo(models.genre);
      bookClub.belongsTo(models.language);
      bookClub.hasMany(models.thread);
    }
  }
  bookClub.init(
    {
      apiId: { type: DataTypes.STRING, allowNull: false },
      title: { type: DataTypes.STRING, allowNull: false },
      imageUrl: { type: DataTypes.STRING, allowNull: false },
      author: { type: DataTypes.STRING, allowNull: false },
      maxPeople: { type: DataTypes.STRING, allowNull: false },
      startDate: { type: DataTypes.STRING, allowNull: false },
      endDate: { type: DataTypes.STRING, allowNull: false },
    },
    {
      sequelize,
      modelName: "bookClub",
    }
  );
  return bookClub;
};
