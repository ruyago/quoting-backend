const mongoose = require("mongoose");
const { Schema, model } = mongoose;

const quoteSchema = new Schema({
  title: String,
  description: String,
  // owner will be added later on
});

module.exports = model("Quote", quoteSchema);
