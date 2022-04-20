const { Router } = require("express");
const User = require("../models").user;
const BookClub = require("../models").bookClub;
const Genre = require("../models").genre;
const Language = require("../models").language;
const Thread = require("../models").thread;
const Comment = require("../models").comment;

const router = new Router();

//get all bookClubs
router.get("/", async (req, res) => {
  try {
    const bookClubs = await BookClub.findAll({
      include: [{ model: User, as: "owner" }, Genre, Language],
      order: [["createdAt", "DESC"]],
    });
    res.status(200).send(bookClubs);
  } catch (e) {
    console.log(e.message);
    res.status(500).send(`Something went wrong`);
  }
});

//get bookClub by Id
router.get("/:id", async (req, res, next) => {
  try {
    const bookClubId = parseInt(req.params.id);
    const bookClub = await BookClub.findByPk(bookClubId, {
      include: [
        { model: User, as: "owner" },
        Genre,
        Language,
        { model: Thread, include: [Comment] },
      ],
    });
    if (!bookClub) {
      return res.status(404).send("Not found");
    }
    res.status(200).send(bookClub);
  } catch (e) {
    console.log(e.message);
    return res.status(500).send("Something went wrong, sorry");
  }
});

module.exports = router;
