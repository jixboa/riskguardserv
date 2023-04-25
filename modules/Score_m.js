const { number } = require("joi");
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

//create Schema

const ScoreSchema = new Schema({
  score_points: {
    type: Number,
    required: true,
    minlength: 1,
    maxlength: 10,
  },
  score_range: {
    type: String,
    required: true,
    minlength: 3,
    maxlength: 50,
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

module.exports = Scores = mongoose.model("scores", ScoreSchema);
