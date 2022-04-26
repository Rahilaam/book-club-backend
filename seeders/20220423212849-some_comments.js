"use strict";
const User = require("../models").user;
const Thread = require("../models").thread;

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

    const thread1 = await Thread.findOne({
      where: { bookClubId: "1" },
    });

    const thread2 = await Thread.findOne({
      where: { bookClubId: "2" },
    });

    const thread3 = await Thread.findOne({
      where: { bookClubId: "3" },
    });

    const thread4 = await Thread.findOne({
      where: { bookClubId: "4" },
    });

    const thread5 = await Thread.findOne({
      where: { bookClubId: "5" },
    });
    const thread6 = await Thread.findOne({
      where: { bookClubId: "6", topic: "Reviews" },
    });

    const thread7 = await Thread.findOne({
      where: { bookClubId: "6", topic: "Educational" },
    });

    await queryInterface.bulkInsert(
      "comments",
      [
        {
          comment:
            "Hosseini’s tragic coming-of-age story about a fractured friendship has so much emotions, suspense and drama.",
          threadId: thread1.id,
          userId: user3.id,
          likes: 3,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          comment:
            "A very compelling story. Beautiful images and a story line that keeps the reader riveted.",
          threadId: thread1.id,
          userId: user2.id,
          likes: 2,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          comment: "Face paced. Effective. Fable.",
          threadId: thread1.id,
          userId: user2.id,
          likes: 5,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          comment:
            "Simple, easy steps, not a quick fix but a reasonable plan to change your habits.",
          threadId: thread2.id,
          userId: user4.id,
          likes: 9,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          comment:
            " I found the book to be very interesting, I never knew how we formed our habits. ",
          threadId: thread2.id,
          userId: user4.id,
          likes: 1,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          comment: "Best travel Book ever",
          threadId: thread4.id,
          userId: user3.id,
          likes: 2,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          comment: "Amazinggg",
          threadId: thread6.id,
          userId: user3.id,
          likes: 3,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          comment: "Give you a quick thought on your spendings!",
          threadId: thread7.id,
          userId: user3.id,
          likes: 2,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      {}
    );
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete("comments", null, {});
  },
};
