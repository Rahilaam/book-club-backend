const { Router } = require("express");
const Genre = require("../models").genre;

const router = new Router();

//get all genres
router.get("/", async (req, res, next) => {
  try {
    const genre = await Genre.findAll();
    // console.log(genre);
    res.status(200).send(genre);
  } catch (e) {
    console.log(error);
    res.status(500).send(`something went wrong`);
  }
});

module.exports = router;
