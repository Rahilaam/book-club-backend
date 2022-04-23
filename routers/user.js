const { Router } = require("express");
const auth=require("../auth/middleware")
const User = require("../models").user;
const BookClub = require("../models").bookClub;

const router = new Router();

//get user bookclubs
router.get("/", auth, async (req, res, next) => {
  try {
    const user = await User.findByPk(req.user.id, {
      include: [
        { model: BookClub, as: "owner" },
        { model: BookClub, as: "participant" },
      ],
    });
    if (!user) {
      return res.status(404).send(`user not found`);
    }
    return res.status(200).send(user);
    // const bookClubsBelongsToThisUser=await BookClub.find
  } catch (e) {
    console.log(e.message);
    res.status(500).send(`something went wrong`);
  }
});

module.exports = router;
