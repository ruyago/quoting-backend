const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");

const Quote = require("../models/quote.model");

router.put("/my-quotes/add-like/:quoteId", (req, res, next) => {
    const { quoteId } = req.params;
  
    if (!mongoose.Types.ObjectId.isValid(quoteId)) {
      res.status(400).json({ message: "Specified id is not valid" });
      return;
    }
  
    Quote.findByIdAndUpdate(quoteId, {$inc : {likes: 1}}, { new: true })
      .then((updatedQuote) => res.json(updatedQuote))
      .catch((error) => res.json(error));
  });

  module.exports = router;