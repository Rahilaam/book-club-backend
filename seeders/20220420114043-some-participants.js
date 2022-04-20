"use strict";
const User = require("../models").user;
const BookClub = require("../models").bookClub;

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const user1 = await User.findOne({
      where: { email: "test@test.com" },
    });

    const user2 = await User.findOne({
      where: { email: "a@a.com" },
    });

    const user3 = await User.findOne({
      where: { email: "T@7.com" },
    });

    const user4 = await User.findOne({
      where: { email: "Jho.com" },
    });

    const bookClub1 = await BookClub.findOne({
      where: { title: "The Kite Runner" },
    });

    const bookClub2 = await BookClub.findOne({
      where: { title: "Atomic Habits" },
    });

    const bookClub3 = await BookClub.findOne({
      where: { title: "Elementaire gewoontes" },
    });

    const bookClub4 = await BookClub.findOne({
      where: { title: "Around the World in 80 Trains" },
    });

    await queryInterface.bulkInsert(
      "participants",
      [
        {
          userId: user2.id,
          bookClubId: bookClub1.id,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          userId: user4.id,
          bookClubId: bookClub2.id,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          userId: user2.id,
          bookClubId: bookClub3.id,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          userId: user3.id,
          bookClubId: bookClub4.id,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          userId: user3.id,
          bookClubId: bookClub1.id,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          userId: user4.id,
          bookClubId: bookClub1.id,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      {}
    );
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete("participants", null, {});
  },
};
