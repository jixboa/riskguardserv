const express = require("express");
const router = express.Router();
const auth = require("../../middleware/auth");
//Item module
const IndProfiles = require("../../modules/Ind_profiler");

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
    const ind_profiles = await IndProfiles.find().sort({ date: -1 });

    res.send(ind_profiles);
  } catch (error) {
    res.status(500).send(error.message);
    console.log(error.message);
  }
});

//@route POST api/item
//@des Create an item
//@access Public

router.post("/", (req, res) => {
  console.log(req.body);
  const newIndProfile = new IndProfiles({
    customer_type: req.body.customer_type,
    customer_type_score: req.body.customer_type_score,
    fullname: req.body.fullname,
    cust_id: req.body.cust_id,
    account_no: req.body.account_no,
    nid: req.body.nid,
    branch: req.body.branch,
    product: req.body.product,
    product_score: req.body.product_score,
    nationality: req.body.nationality_score,
    nationality_score: req.body.nationality_score,
    delivery_channel: req.body.delivery_channel,
    delivery_channel_score: req.body.delivery_channel_score,
    customer_status: req.body.customer_status,
    customer_status_score: req.body.customer_status_score,
    country_of_residence: req.body.country_of_residence,
    country_of_residence_score: req.body.country_of_residence_score,
    screening_status: req.body.screening_status,
    screening_status_score: req.body.customer_status_score,
    customer_pep_status: req.body.customer_pep_status,
    customer_pep_status_score: req.body.customer_pep_status_score,
    expected_country_of_transaction: req.body.expected_country_of_transaction,
    expected_country_of_transaction_score:
      req.body.expected_country_of_transaction_score,
    source_of_funds: req.body.source_of_funds,
    source_of_funds_score: req.body.source_of_funds_score,
    expected_monthly_income: req.body.expected_monthly_income,
    expected_monthly_income_score: req.body.expected_monthly_income_score,
  });

  newIndProfile.save().then((profile) => res.json(profile));
});

router.patch("/:id", auth, async (req, res) => {
  const item = await IndProfiles.findById(req.params.id);
  if (!item) return res.status(404).send("Not  found");

  try {
    const updatedTodo = await IndProfiles.findByIdAndUpdate(
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
  IndProfiles.findById(req.params.id)
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
  IndProfiles.findById(req.params.id)
    .then((item) => item.remove().then(() => res.json({ success: true, item })))
    .catch((err) => res.status(404).json({ sucess: false, err }));
});

router.get("/:id", auth, (req, res) => {
  IndProfiles.findById(req.params.id)
    .then((items) => res.json({ items }))
    .catch((err) => res.status(404).json({ err }));
});

module.exports = router;
