const mongoose = require("mongoose");
const Schema = mongoose.Schema;

//create Schema

const UserSchema = new Schema({
  fname: {
    type: String,
    required: true,
    minlength: 3,
    maxlength: 30,
  },
  lname: {
    type: String,
    required: true,
    minlength: 3,
    maxlength: 30,
  },
  email: {
    type: String,
    required: true,
    minlength: 3,
    maxlength: 200,
    unique: true,
  },
  password: {
    type: String,
    required: true,
    minlength: 6,
    maxlength: 1024,
  },
  role: {
    type: String,
    required: true,
    minlength: 3,
    maxlength: 30,
  },
  date: {
    type: Date,
    default: Date.now,
  },
});

module.exports = User = mongoose.model("user", UserSchema);
