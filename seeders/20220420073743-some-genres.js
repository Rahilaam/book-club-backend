"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert(
      "genres",
      [
        {
          genre: "fiction",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          genre: "self-help",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          genre: "adventure",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      {}
    );
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete("languages", null, {});
  },
};
