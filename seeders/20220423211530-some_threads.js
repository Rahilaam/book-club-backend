"use strict";
const BookClub = require("../models").bookClub;

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const club1 = await BookClub.findOne({
      where: { title: "The Kite Runner" },
    });
    const club2 = await BookClub.findOne({
      where: { title: "Atomic Habits" },
    });
    const club3 = await BookClub.findOne({
      where: { title: "Elementaire gewoontes" },
    });
    const club4 = await BookClub.findOne({
      where: { title: "Around the World in 80 Trains" },
    });
    const club5 = await BookClub.findOne({
      where: { title: "Harry Potter en de steen der wijzen" },
    });
    const club6 = await BookClub.findOne({
      where: { title: "Rich Dad, Poor Dad" },
    });
    await queryInterface.bulkInsert(
      "threads",
      [
        {
          topic: "Reviews",
          bookClubId: club1.id,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          topic: "Reviews",
          bookClubId: club2.id,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          topic: "Reviews",
          bookClubId: club3.id,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          topic: "Reviews",
          bookClubId: club4.id,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          topic: "Reviews",
          bookClubId:club5.id,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          topic: "Reviews",
          bookClubId: club6.id,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          topic: "Educational",
          bookClubId: club6.id,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      {}
    );
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete("threads", null, {});
  },
};
