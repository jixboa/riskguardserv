const mongoose = require("mongoose");
const Schema = mongoose.Schema;

//create Schema

const IndProfilerSchema = new Schema(
  {
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
    cust_id: {
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
    nid: {
      type: String,
      required: true,
      minlength: 3,
      maxlength: 30,
    },
    customer_type: {
      type: String,
      required: true,
      maxlength: 30,
    },
    customer_type_score: {
      type: String,
      required: true,
      maxlength: 30,
    },
    product: {
      type: String,
      required: true,
      maxlength: 50,
    },
    product_score: {
      type: String,
      required: true,
      maxlength: 50,
    },
    nationality: {
      type: String,
      required: true,
      maxlength: 30,
    },
    nationality_score: {
      type: String,
      required: true,
      maxlength: 30,
    },
    delivery_channel: {
      type: String,
      required: true,
      minlength: 1,
      maxlength: 50,
    },
    delivery_channel_score: {
      type: String,
      required: true,
      maxlength: 50,
    },
    customer_status: {
      type: String,
      required: true,
      maxlength: 50,
    },
    customer_status_score: {
      type: String,
      required: true,
      maxlength: 50,
    },
    country_of_residence: {
      type: String,
      required: true,
      maxlength: 50,
    },
    country_of_residence_score: {
      type: String,
      required: true,
      maxlength: 50,
    },
    screening_status: {
      type: String,
      required: true,
      minlength: 3,
      maxlength: 50,
    },
    screening_status_score: {
      type: String,
      required: true,
      maxlength: 50,
    },
    customer_pep_status: {
      type: String,
      required: true,
      minlength: 1,
      maxlength: 50,
    },

    customer_pep_status_score: {
      type: String,
      required: true,
      maxlength: 50,
    },
    expected_country_of_transaction: {
      type: String,
      required: true,
      minlength: 1,
      maxlength: 50,
    },
    expected_country_of_transaction_score: {
      type: String,
      required: true,
      maxlength: 50,
    },
    source_of_funds: {
      type: String,
      required: true,
      minlength: 1,
      maxlength: 50,
    },
    source_of_funds_score: {
      type: String,
      required: true,
      maxlength: 50,
    },
    expected_monthly_income: {
      type: String,
      required: true,
      minlength: 1,
      maxlength: 50,
    },
    expected_monthly_income_score: {
      type: String,
      required: true,
      maxlength: 50,
    },

    total_score: {
      type: String,
      maxlength: 50,
    },
    creator: {
      type: String,
      minlength: 1,
      maxlength: 10,
    },
    verifier: {
      type: String,
      minlength: 1,
      maxlength: 10,
    },
    approver: {
      type: String,
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
  },
  { strict: false }
);

module.exports = IndProfiles = mongoose.model(
  "ind_profiles",
  IndProfilerSchema
);
