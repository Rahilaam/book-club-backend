"use strict";
const User = require("../models").user;
const Genre = require("../models").genre;
const Language = require("../models").language;

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const genre1 = await Genre.findOne({
      where: { genre: "fiction" },
    });
    const genre2 = await Genre.findOne({
      where: { genre: "self-help" },
    });
    const genre3 = await Genre.findOne({
      where: { genre: "adventure" },
    });

    const language1 = await Language.findOne({
      where: { language: "English" },
    });

    const language2 = await Language.findOne({
      where: { language: "Dutch" },
    });

    const user1 = await User.findOne({
      where: { email: "test@test.com" },
    });

    const user2 = await User.findOne({
      where: { email: "a@a.com" },
    });

    const user3 = await User.findOne({
      where: { email: "T@7.com" },
    });

    await queryInterface.bulkInsert(
      "bookClubs",
      [
        {
          apiId: "MH48bnzN0LUC",
          title: "The Kite Runner",
          imageUrl:
            "https://books.google.com/books/content?id=MH48bnzN0LUC&printsec=frontcover&img=1&zoom=1&edge=curl&source=gbs_api",
          author: "Khaled Hosseini",
          genreId: genre1.id,
          languageId: language1.id,
          maxPeople: 20,
          ownerId: user1.id,
          startDate: new Date(),
          endDate: new Date(),
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          apiId: "fFCjDQAAQBAJ",
          title: "Atomic Habits",
          imageUrl:
            "http://books.google.com/books/content?id=fFCjDQAAQBAJ&printsec=frontcover&img=1&zoom=1&edge=curl&source=gbs_api",
          author: "James Clear",
          genreId: genre2.id,
          languageId: language1.id,
          maxPeople: 20,
          ownerId: user2.id,
          startDate: new Date(),
          endDate: new Date(),
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          apiId: "fFCjDQAAQBAJ",
          title: "Elementaire gewoontes",
          imageUrl:
            "https://books.google.com/books/content?id=bteMDwAAQBAJ&printsec=frontcover&img=1&zoom=1&edge=curl&source=gbs_api",
          author: "James Clear",
          genreId: genre2.id,
          languageId: language2.id,
          maxPeople: 20,
          ownerId: user1.id,
          startDate: new Date(),
          endDate: new Date(),
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          apiId: "3meDDwAAQBAJ",
          title: "Around the World in 80 Trains",
          imageUrl:
            "http://books.google.com/books/content?id=3meDDwAAQBAJ&printsec=frontcover&img=1&zoom=1&edge=curl&source=gbs_api",
          author: "Monisha Rajesh",
          genreId: genre3.id,
          languageId: language1.id,
          maxPeople: 20,
          ownerId: user2.id,
          startDate: new Date(),
          endDate: new Date(),
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          apiId: "VHpUPgAACAAJ",
          title: "Harry Potter en de steen der wijzen",
          imageUrl:
            "http://books.google.com/books/content?id=VHpUPgAACAAJ&printsec=frontcover&img=1&zoom=1&source=gbs_api",
          author: "Joanne Kathleen Rowling",
          genreId: genre1.id,
          languageId: language2.id,
          maxPeople: 20,
          ownerId: user1.id,
          startDate: new Date(),
          endDate: new Date(),
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          apiId: "Cx6aDwAAQBAJ",
          title: "Rich Dad, Poor Dad",
          imageUrl:
            "http://books.google.com/books/content?id=Cx6aDwAAQBAJ&printsec=frontcover&img=1&zoom=1&edge=curl&source=gbs_api",
          author: "Robert T. Kiyosaki",
          genreId: genre2.id,
          languageId: language1.id,
          maxPeople: 20,
          ownerId: user3.id,
          startDate: new Date(),
          endDate: new Date(),
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      {}
    );
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete("bookClubs", null, {});
  },
};
