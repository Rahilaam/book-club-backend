const { Router } = require("express");
const Language = require("../models").language;

const router = new Router();

//get all languages
router.get("/", async (req, res, next) => {
  try {
    const language = await Language.findAll();
    // console.log(genre);
    res.status(200).send(language);
  } catch (e) {
    console.log(e);
    res.status(500).send(`something went wrong`);
  }
});

module.exports = router;
