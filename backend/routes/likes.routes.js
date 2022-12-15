const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");

const Quote = require("../models/quote.model");
const User= require("../models/User.model");

router.put("/my-quotes/add-like/:quoteId", (req, res, next) => {
    const { quoteId } = req.params;
    const {userId} = req.body;

    console.log(userId)
    if (!mongoose.Types.ObjectId.isValid(quoteId)) {
      res.status(400).json({ message: "Specified id is not valid" });
      return;
    }
  
    return Quote.findByIdAndUpdate(quoteId, {$inc : {likes: 1}}, { new: true })
    .then ((resp)=>{
    return User.findByIdAndUpdate(userId, {$push : {userLikes: quoteId}}, { new: true })})
      .then((updatedQuote) => 
      {console.log("hello backend", updatedQuote);
      res.json(updatedQuote)})
      .catch((error) => res.json(error));
  });

  module.exports = router;