const mongoose = require("mongoose");
const { Schema, model } = mongoose;

const quoteSchema = new Schema({
  title: String,
  description: String,
  owner: String,
  likes: Number,
  
});

module.exports = model("Quote", quoteSchema);
