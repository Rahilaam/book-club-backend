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
        {
          model: Thread,
          include: {
            model: Comment,
            include: { model: User, attributes: ["name"] },
          },
        },
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

//add a new comment
router.post("/:id/threads/:threadId/comments", auth, async (req, res) => {
  // console.log(req.params.id);
  const bookClub = await BookClub.findByPk(req.params.id);
  // console.log(space);

  if (!bookClub) {
    return res.status(404).send({ message: "This club does not exist" });
  }
  //const id = req.user.id
  const thread = await Thread.findByPk(req.params.threadId);
  if (!thread || thread.bookClubId !== bookClub.id) {
    return res.status(404).send({ message: "This thread does not exist" });
  }
  const participantExist = await Participant.findOne({
    where: { userId: req.user.id, bookClubId: req.params.id },
  });

  console.log("book club owner", bookClub.ownerId);
  console.log("req user", req.user.id);

  if (!participantExist && req.user.id !== bookClub.ownerId) {
    return res
      .status(400)
      .send({ message: "You are are not a member of this club." });
  }
  console.log(req.user);
  // console.log(user);
  const { comment } = req.body;
  const newComment = await Comment.create({
    comment,
    userId: req.user.id,
    threadId: req.params.threadId,
  });
  const fetchComment = await Comment.findByPk(newComment.id, {
    include: [{ model: User, attributes: ["name"] }],
  });
  return res.status(200).send(fetchComment);
});

//create new thread
router.post("/:id/threads", auth, async (request, response, next) => {
  const { topic } = request.body;
  const bookClub = await BookClub.findByPk(req.params.id);
  if (!bookClub) {
    return res.status(404).send({ message: "This club does not exist" });
  }
  //const id = req.user.id
  const user = await User.findByPk(request.user.id);
  if (!user) {
    return response.status(404).send("No user found");
  }

  if (!topic) {
    return response.status(400).send("Give title,imageUrl and minimumBid");
  }
  const thread = await Thread.create({
    topic,
    userId: req.user.id,
    bookClubId: req.params.id,
  });

  //   console.log(newArtWork);
  return response.status(200).send({ ...thread.dataValues, comments: [] });
});

//posting new bookClub
router.post("/", auth, async (request, response, next) => {
  const {
    apiId,
    author,
    genre,
    starDate,
    endDate,
    title,
    maxPeople,
    language,
  } = request.body;
  const genre = await Genre.findOne({ where: { genre: genre } });
  if (!genre) {
    const newGenre = await Genre.create({ genre: genre });
  }
  //const id = req.user.id
  const user = await User.findByPk(request.user.id);
  if (!user) {
    return response.status(404).send("No user found");
  }

  if (!title || !apiId) {
    return response.status(400).send("Give title,apiId");
  }

  //   console.log(newArtWork);
  return response.status(200).send("success");
});
module.exports = router;
