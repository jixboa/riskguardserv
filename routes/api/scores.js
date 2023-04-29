const express = require("express");
const router = express.Router();
const auth = require("../../middleware/auth");
//Item module
const Scores = require("../../modules/Score_m");

//@route GET api/item
//@des Get All Items
//@access Public
/* router.get("/", auth, (req, res) => {
  Item.find()
    .sort({ date: -1 })
    .then((items) => res.json(items));
  console.log(req.user);
}); */
router.get("/", async (req, res) => {
  try {
    const scores = await Scores.find().sort({ date: 1 });

    res.send(scores);
  } catch (error) {
    res.status(500).send(error.message);
    console.log(error.message);
  }
});

//@route POST api/item
//@des Create an item
//@access Public

router.post("/", auth, (req, res) => {
  //console.log(req.body);
  const newScore = new Scores({
    score_points: req.body.score_point,
    score_range: req.body.score_range,
  });

  newScore.save().then((score) => res.json(score));
});

router.patch("/:id", auth, async (req, res) => {
  const item = await Item.findById(req.params.id);
  if (!item) return res.status(404).send("No todo found");
  if (item.uid !== req.user._id)
    return res.status(401).send("Todo Update Failed, (Not Authorized..");

  try {
    const updatedTodo = await Item.findByIdAndUpdate(
      req.params.id,
      {
        isComplete: !item.isComplete,
      },
      { new: true }
    );
    res.send(updatedTodo);
  } catch (error) {
    res.status(500).send(error.message);
    console.log(error.message);
  }
});

router.put("/:id", auth, (req, res) => {
  Scores.findById(req.params.id)
    .then((score) => {
      score.score_range = req.body.new_range;

      score.save().then(() => res.json(score));
    })
    .catch((err) => res.status(400).json("Error: " + err));
});

//@route DELETE api/item/:id
//@des DELETE an item
//@access Public
router.delete("/:id", auth, (req, res) => {
  Scores.findById(req.params.id)
    .then((score) =>
      score.remove().then(() => res.json({ success: true, score }))
    )
    .catch((err) => res.status(404).json({ sucess: false, err }));
});

router.get("/:id", auth, (req, res) => {
  Scores.findById(req.params.id)
    .then((items) => res.json({ items }))
    .catch((err) => res.status(404).json({ err }));
});

module.exports = router;
