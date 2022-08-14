const mongoose = require("mongoose");
const Quote = require("../models/Quote");

module.exports.getAllQuotesRequest = async (req, res) => {
  const allQuotes = await Quote.find({});
  res.status(200).json(allQuotes);
};

module.exports.getQuoteById = async (req, res) => {
  const id = req.params.id;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.sendStatus(404);
  }

  const quote = await Quote.findById(id);
  if (!quote) {
    return res.sendStatus(404);
  }

  res.status(200).json(quote);
};

module.exports.addNewQuote = async (req, res) => {
  if (req.body === undefined) {
    return res.sendStatus(400);
  }

  const { quote, author } = req.body;
  if (quote.length === 0 || author.length === 0) {
    return res.sendStatus(400);
  }

  const newQuote = new Quote({
    quote,
    author,
  });

  await newQuote.save();
  return res.status(201).send(JSON.stringify(newQuote));
};

module.exports.editQuote = async (req, res) => {
  if (req.body === undefined) {
    return res.sendStatus(400);
  }

  const id = req.params.id;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.sendStatus(400);
  }

  //add check to see if json is correct
  const { quote, author } = req.body;
  if (quote.length === 0 || author.length === 0) {
    return res.sendStatus(400);
  }

  const updatedQuote = await Quote.findByIdAndUpdate(id, {
    quote,
    author,
    modifiedAt: Date.now(),
  });

  if (updatedQuote === null) {
    return res.sendStatus(400);
  }

  return res.send(JSON.stringify(updatedQuote));
};

module.exports.deleteQuote = async (req, res) => {
  const id = req.params.id;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.sendStatus(400);
  }

  const deletedQuote = await Quote.findByIdAndDelete(id);

  return res.sendStatus(204);
};

module.exports.getQuoteByAuthor = async (req, res) => {
  const params = req.body;
  const paramKeys = Object.keys(params);

  if (
    paramKeys.length === 0 ||
    !paramKeys.includes("author") ||
    params.author.length === 0
  ) {
    return res.sendStatus(400);
  }

  const result = await Quote.findByAuthor(params.author);

  res.setHeader("content-type", "application/json");
  return res.status(200).send(JSON.stringify(result));
};
