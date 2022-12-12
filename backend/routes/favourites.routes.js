const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");

const Quote = require("../models/quote.model");
const User = require("../models/User.model");



router.post('/favourites', (req, res, next) => {
    const { _id, user } = req.body

        console.log(user._id)
        return Quote.findById(_id).then((foundQuote)=> User.findByIdAndUpdate(user._id, {
            $push: { favQuotes: foundQuote },
          }))
       
            .then((response) => res.json(response))

    
  });

  router.get("/favourites/:user_id", (req, res, next) => {
    const { user_id } = req.params;

  
    if (!mongoose.Types.ObjectId.isValid(user_id)) {
      res.status(400).json({ message: "Specified id is not valid" });
      return;
    }
  
    User.findById(user_id)
      .populate("favQuotes")
      .then((favQuotes) => res.status(200).json(favQuotes))
      .catch((error) => res.json(error));
  });


  module.exports = router;