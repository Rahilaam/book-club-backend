"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn("bookClubs", "ownerId", {
      type: Sequelize.INTEGER,
      references: {
        model: "users",
        key: "id",
      },
      onUpdate: "CASCADE",
      onDelete: "SET NULL",
    });

    await queryInterface.addColumn("bookClubs", "genreId", {
      type: Sequelize.INTEGER,
      references: {
        model: "genres",
        key: "id",
      },
      onUpdate: "CASCADE",
      onDelete: "SET NULL",
    });

    await queryInterface.addColumn("bookClubs", "languageId", {
      type: Sequelize.INTEGER,
      references: {
        model: "languages",
        key: "id",
      },
      onUpdate: "CASCADE",
      onDelete: "SET NULL",
    });

    await queryInterface.addColumn("threads", "bookClubId", {
      type: Sequelize.INTEGER,
      references: {
        model: "bookClubs",
        key: "id",
      },
      onUpdate: "CASCADE",
      onDelete: "SET NULL",
    });

    await queryInterface.addColumn("comments", "threadId", {
      type: Sequelize.INTEGER,
      references: {
        model: "threads",
        key: "id",
      },
      onUpdate: "CASCADE",
      onDelete: "SET NULL",
    });

    await queryInterface.addColumn("comments", "userId", {
      type: Sequelize.INTEGER,
      references: {
        model: "users",
        key: "id",
      },
      onUpdate: "CASCADE",
      onDelete: "SET NULL",
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeColumn("bookClubs", "ownerId");
    await queryInterface.removeColumn("bookClubs", "genreId");
    await queryInterface.removeColumn("bookClubs", "languageId");
    await queryInterface.removeColumn("threads", "bookClubId");
    await queryInterface.removeColumn("comments", "threadId");
    await queryInterface.removeColumn("comments", "userId");



  },
};
