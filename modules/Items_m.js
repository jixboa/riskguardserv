const mongoose = require("mongoose");
const Schema = mongoose.Schema;

//create Schema

const ItemSchema = new Schema({
  indicator_type: {
    type: String,
    required: true,
    minlength: 3,
    maxlength: 30,
  },
  indicator_name: {
    type: String,
    required: true,
    minlength: 3,
    maxlength: 50,
  },
  item_description: {
    type: String,
    required: true,
    minlength: 1,
    maxlength: 200,
  },
  score: {
    type: String,
    required: true,
    minlength: 1,
    maxlength: 10,
  },
  act_type: {
    type: String,
    default: "Verified",
  },
  del_flg: {
    type: String,
    default: 0,
  },

  date: {
    type: Date,
    default: Date.now,
  },
  recre_time: {
    type: Date,
    default: Date.now,
  },
});

module.exports = Items = mongoose.model("items", ItemSchema);
