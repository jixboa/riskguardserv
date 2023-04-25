const mongoose = require("mongoose");
const Schema = mongoose.Schema;

//create Schema

const CorpProfilerSchema = new Schema({
  fullname: {
    type: String,
    required: true,
    minlength: 3,
    maxlength: 30,
  },
  account_no: {
    type: String,
    required: true,
    minlength: 3,
    maxlength: 30,
  },
  customer_id: {
    type: String,
    required: true,
    minlength: 3,
    maxlength: 30,
  },
  branch: {
    type: String,
    required: true,
    minlength: 3,
    maxlength: 30,
  },
  ghanacard: {
    type: String,
    required: true,
    minlength: 3,
    maxlength: 30,
  },
  nationality: {
    type: String,
    required: true,
    minlength: 3,
    maxlength: 30,
  },
  nationality_score: {
    type: String,
    required: true,
    minlength: 3,
    maxlength: 30,
  },
  gender_score: {
    type: String,
    required: true,
    minlength: 3,
    maxlength: 50,
  },
  product: {
    type: String,
    required: true,
    minlength: 3,
    maxlength: 50,
  },
  product_score: {
    type: String,
    required: true,
    minlength: 3,
    maxlength: 50,
  },
  delivery_channel: {
    type: String,
    required: true,
    minlength: 1,
    maxlength: 10,
  },
  delivery_channel_score: {
    type: String,
    required: true,
    minlength: 1,
    maxlength: 10,
  },
  accout_type: {
    type: String,
    required: true,
    minlength: 1,
    maxlength: 10,
  },
  accout_type_score: {
    type: String,
    required: true,
    minlength: 1,
    maxlength: 10,
  },
  total_score: {
    type: String,
    required: true,
    minlength: 1,
    maxlength: 10,
  },
  creator: {
    type: String,
    required: true,
    minlength: 1,
    maxlength: 10,
  },
  verifier: {
    type: String,
    required: true,
    minlength: 1,
    maxlength: 10,
  },
  approver: {
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

module.exports = CorpProfiles = mongoose.model(
  "corp_profiles",
  CorpProfilerSchema
);
