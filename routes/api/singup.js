const joi = require("joi");
const express = require("express");
const router = express.Router();
const User = require("../../modules/User");
const jwt = require("jsonwebtoken");

const bcrypt = require("bcrypt");

/* router.post('/',(req, res) => {
    const newUser = new User({
        name: req.body.name,
        email: req.body.email,
        password: req.body.password
    });
    
    newUser.save().then(user => res.json(user));
}); */

router.get("/", (req, res) => {
  User.find()
    .sort({ date: -1 })
    .then((users) => res.json(users));
});

router.post("/", async (req, res) => {
  const schema = joi.object({
    email: joi.string().min(3).max(200).email().required(),
    fname: joi.string().min(3).max(30).required(),
    lname: joi.string().min(3).max(30).required(),
    password: joi.string().min(6).max(200).required(),
    role: joi.string().max(200).required(),
  });

  const { error } = schema.validate(req.body);

  if (error) return res.status(400).send(error.details[0].message);

  try {
    let user = await User.findOne({ email: req.body.email });
    if (user) return res.status(400).send("User already exist..");

    const { fname, lname, email, password, role } = req.body;

    user = new User({
      fname,
      lname,
      email,
      password,
      role,
    });

    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(user.password, salt);

    await user.save();

    const secretKey = require("../../config/keys").SECRET_KEY;
    const token = jwt.sign(
      {
        _id: user._id,
        fname: user.fname,
        lname: user.lname,
        email: user.email,
        role: user.role,
      },
      secretKey
    );

    res.send(token);
  } catch (error) {
    res.status(500).send(error.message);
    console.log(error.message);
  }
});

module.exports = router;
