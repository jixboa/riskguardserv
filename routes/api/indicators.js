const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");

const auth = require("../../middleware/auth");
//Item module
const Indicator_tbs = require("../../modules/Indicator_m");

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
    const indicators = await Indicator_tbs.find().sort({ date: 1 });

    res.send(indicators);
  } catch (error) {
    res.status(500).send(error.message);
    console.log(error.message);
  }
});

//@route POST api/item
//@des Create an item
//@access Public

router.post("/", (req, res) => {
  //console.log(req.body);
  const newIndicator_m = new Indicator_tbs({
    indicator_type: req.body.indicator_type,
    indicator_name: req.body.indicator_name,
  });

  newIndicator_m.save().then((indicator) => res.json(indicator));
});

router.patch("/:id", auth, async (req, res) => {
  const indicator = await Indicator_tbs.findById(req.params.id);
  if (!indicator) return res.status(404).send("No todo found");

  try {
    const updatedIndicator = await Indicator_tbs.findByIdAndUpdate(
      req.params.id,
      {
        indicator_name: req.body.indicator_name,
      },
      { new: true }
    );
    res.send(updatedIndicator);
  } catch (error) {
    res.status(500).send(error.message);
    console.log(error.message);
  }
});

router.put("/:id", auth, (req, res) => {
  Indicator_tbs.findById(req.params.id)
    .then((indicator) => {
      indicator.indicator_name = req.body.new_name;

      indicator.save().then(() => res.json(indicator));
      //console.log(indicator_name + " updated");
    })
    .catch((err) => res.status(400).json("Error: " + err));
});

//@route DELETE api/item/:id
//@des DELETE an item
//@access Public
/* router.delete("/:id", auth, (req, res) => {
  Indicator_tbs.findById(req.params.id)
    .then((item) => item.remove().then(() => res.json({ success: true, item })))
    .catch((err) => res.status(404).json({ sucess: false, err }));
}); */
router.delete("/:ids", async (req, res) => {
  const idString = req.params.ids;
  const ids = idString.split(",").map((id) => mongoose.Types.ObjectId(id));
  try {
    const indicators = await Indicator_tbs.find({ _id: { $in: ids } });
    if (indicators.length === 0) {
      return res.status(404).json({ message: "Item not found" });
    }

    await Indicator_tbs.deleteMany({ _id: { $in: ids } });
    res.json({ message: "Items deleted successfully" });
  } catch (error) {
    res.status(500).send(error.message);
    console.error(error);
  }
});

router.get("/:id", auth, (req, res) => {
  Indicator_tbs.findById(req.params.id)
    .then((items) => res.json({ items }))
    .catch((err) => res.status(404).json({ err }));
});

module.exports = router;
