const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const auth = require("../../middleware/auth");
//Item module
const Items = require("../../modules/Items_m");

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
    const items = await Items.find().sort({ date: -1 });

    res.send(items);
  } catch (error) {
    res.status(500).send(error.message);
    console.log(error.message);
  }
});

//@route POST api/item
//@des Create an item
//@access Public

router.post("/", auth, (req, res) => {
  const newItem = new Items({
    indicator_type: req.body.indicator_type,
    indicator_name: req.body.indicator_name,
    item_description: req.body.description,
    score: req.body.score,
  });

  newItem.save().then((item) => res.json(item));
});

router.patch("/:id", auth, async (req, res) => {
  const item = await Items.findById(req.params.id);
  if (!item) return res.status(404).send("Not  found");

  try {
    const updatedTodo = await Items.findByIdAndUpdate(
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
  Items.findById(req.params.id)
    .then((item) => {
      (item.item_description = req.body.description),
        (item.score = req.body.score);

      item.save().then(() => res.json(item));
    })
    .catch((err) => res.status(400).json("Error: " + err));
});

//@route DELETE api/item/:id
//@des DELETE an item
//@access Public
/* router.delete("/:id", auth, (req, res) => {
  Items.findById(req.params.id)
    .then((item) => item.remove().then(() => res.json({ success: true, item })))
    .catch((err) => res.status(404).json({ sucess: false, err }));
});
 */

router.delete("/:ids", async (req, res) => {
  const idString = req.params.ids;
  const ids = idString.split(",").map((id) => mongoose.Types.ObjectId(id));
  try {
    const items = await Items.find({ _id: { $in: ids } });
    if (items.length === 0) {
      return res.status(404).json({ message: "Item not found" });
    }

    await Items.deleteMany({ _id: { $in: ids } });
    res.json({ message: "Items deleted successfully" });
  } catch (error) {
    res.status(500).send(error.message);
    console.error(error);
  }
});

router.get("/:id", auth, (req, res) => {
  Items.findById(req.params.id)
    .then((items) => res.json({ items }))
    .catch((err) => res.status(404).json({ err }));
});

module.exports = router;
