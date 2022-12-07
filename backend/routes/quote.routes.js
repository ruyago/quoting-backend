const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");

const Quote = require("../models/quote.model");


//  POST /api/my-quotes  -  Creates a new quote
router.post("/my-quotes", (req, res, next) => {
  const { title, description,owner } = req.body;

  Quote.create({ title, description, owner})
    .then((response) => res.json(response))
    .catch((err) => res.json(err));
});

//  GET /api/my-quotes -  Retrieves all of the quotes
router.get("/my-quotes", (req, res, next) => {
  Quote.find()

    .then((allQuotes) => res.json(allQuotes))
    .catch((err) => res.json(err));
});

//  GET /api/my-quotes/:quoteId -  Retrieves a specific quote by id
router.get("/my-quotes/:quoteId", (req, res, next) => {
  const { quoteId } = req.params;

  if (!mongoose.Types.ObjectId.isValid(quoteId)) {
    res.status(400).json({ message: "Specified id is not valid" });
    return;
  }

  // Each quote document has `details` array holding `_id`s of details documents
  // We use .populate() method to get swap the `_id`s for the actual details documents
  Quote.findById(quoteId)
    
    .then((quote) => res.status(200).json(quote))
    .catch((error) => res.json(error));
});

// PUT  /api/my-quotes/:quoteId  -  Updates a specific quote by id
router.put("/my-quotes/:quoteId", (req, res, next) => {
  const { quotetId } = req.params;

  if (!mongoose.Types.ObjectId.isValid(quoteId)) {
    res.status(400).json({ message: "Specified id is not valid" });
    return;
  }

  Quote.findByIdAndUpdate(quoteId, req.body, { new: true })
    .then((updatedQuote) => res.json(updatedQuote))
    .catch((error) => res.json(error));
});

// DELETE  /api/my-quotes/:quoteId  -  Deletes a specific quote by id
router.delete("/my-quotes/:quoteId", (req, res, next) => {
  const { quoteId } = req.params;

  if (!mongoose.Types.ObjectId.isValid(quoteId)) {
    res.status(400).json({ message: "Specified id is not valid" });
    return;
  }

  Quote.findByIdAndRemove(quoteId)
    .then(() =>
      res.json({
        message: `Quote with ${quoteId} is removed successfully.`,
      })
    )
    .catch((error) => res.json(error));
});

module.exports = router;
