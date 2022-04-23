const { Router } = require("express");
const User = require("../models").user;
const BookClub = require("../models").bookClub;
const Genre = require("../models").genre;
const Language = require("../models").language;
const Thread = require("../models").thread;
const Comment = require("../models").comment;
const Participant = require("../models").participant;
const auth = require("../auth/middleware");

const router = new Router();

//get all bookClubs
router.get("/", async (req, res) => {
  try {
    const bookClubs = await BookClub.findAll({
      include: [
        { model: User, as: "owner", attributes: ["id", "name"] },
        { model: User, as: "participant", attributes: ["id", "name"] },
        Genre,
        Language,
      ],
      order: [["startDate", "ASC"]],
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
        { model: User, as: "owner", attributes: ["id", "name"] },
        { model: User, as: "participant", attributes: ["id", "name"] },
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

//Adding participant to the bookClub
router.post("/:id/join", auth, async (req, res) => {
  console.log(req.params.id);
  const bookClub = await BookClub.findByPk(req.params.id);
  // console.log(space);

  if (!bookClub) {
    return res.status(404).send({ message: "This club does not exist" });
  }
  if (bookClub.ownerId === req.user.id) {
    return res.status(400).send({ message: "Owner of the club cannot join" });
  }

  //const id = req.user.id
  const participantExist = await Participant.findOne({
    where: { userId: req.user.id, bookClubId: req.params.id },
  });
  if (participantExist) {
    return res.status(400).send({ message: "You are already joined." });
  }

  console.log(req.user);
  // console.log(user);

  const newParticipant = await Participant.create({
    userId: req.user.id,
    bookClubId: req.params.id,
  });

  console.log(newParticipant);
  const participant = await Participant.findByPk(newParticipant.id, {
    include: [{ model: User, attributes: ["id", "name"] }],
  });

  return res.status(201).send(participant);
});

module.exports = router;
