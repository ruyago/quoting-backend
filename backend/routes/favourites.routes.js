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
            .catch((error) => res.json(error));

    
  });

  router.put('/favourites/:quoteId', (req, res, next) => {
    const {quoteId } = req.params
    const user = req.body

    console.log(quoteId, user)

    
        return User.findByIdAndUpdate(user._id, {
            $pull: { favQuotes: quoteId },
          })
       
            .then((response) => res.json(response))
            .catch((error) => res.json(error));

    
  });



  router.get("/favourites/:user_id", async (req, res, next) => {
    const { user_id } = req.params;

  
    if (!mongoose.Types.ObjectId.isValid(user_id)) {
      res.status(400).json({ message: "Specified id is not valid" });
      return;
    }
    try{

      const user =  await User.findById(user_id).populate("favQuotes")
    
      console.log(user);
      res.status(200).json(user.favQuotes)

    
    }
 catch (error){console.log(error)}
      // .then((favQuotes) => res.status(200).json(favQuotes))
      // .catch((error) => res.json(error));
  });




  module.exports = router;