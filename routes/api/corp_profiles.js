const express = require("express");
const router = express.Router();
const auth = require("../../middleware/auth");
//Item module
const CorpProfiles = require("../../modules/Corp_profiler");

//@route GET api/item
//@des Get All Items
//@access Public
/* router.get("/", auth, (req, res) => {
  Item.find()
    .sort({ date: -1 })
    .then((items) => res.json(items));
  console.log(req.user);
}); */
router.get("/", auth, async (req, res) => {
  try {
    const items = await CorpProfiles.find().sort({ date: -1 });

    res.send(items);
  } catch (error) {
    res.status(500).send(error.message);
    console.log(error.message);
  }
});

//@route POST api/item
//@des Create an item
//@access Public

router.post("/", (req, res) => {
  const newItem = new CorpProfiles({
    indicator_type: req.body.indicator_type,
    indicator_name: req.body.indicator_name,
    item_description: req.body.description,
    score: req.body.score,
  });

  newItem.save().then((item) => res.json(item));
});

router.patch("/:id", auth, async (req, res) => {
  const item = await CorpProfiles.findById(req.params.id);
  if (!item) return res.status(404).send("Not  found");

  try {
    const updatedTodo = await CorpProfiles.findByIdAndUpdate(
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
  CorpProfiles.findById(req.params.id)
    .then((item) => {
      (item.name = req.body.name),
        (item.isComplete = req.body.isComplete),
        (item.date = req.body.date),
        (item.author = req.body.author),
        (item.uid = req.body.uid);

      if (item.uid !== req.user._id)
        return res.status(401).send("Todo Check Failed, (Not Authorized..");

      item.save().then(() => res.json(item));
    })
    .catch((err) => res.status(400).json("Error: " + err));
});

//@route DELETE api/item/:id
//@des DELETE an item
//@access Public
router.delete("/:id", auth, (req, res) => {
  CorpProfiles.findById(req.params.id)
    .then((item) => item.remove().then(() => res.json({ success: true, item })))
    .catch((err) => res.status(404).json({ sucess: false, err }));
});

router.get("/:id", auth, (req, res) => {
  CorpProfiles.findById(req.params.id)
    .then((items) => res.json({ items }))
    .catch((err) => res.status(404).json({ err }));
});

module.exports = router;
