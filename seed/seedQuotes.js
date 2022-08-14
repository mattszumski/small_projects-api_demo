const quotesDB = require("../models/Quote");

const getAllQuotes = async () => {
  return await quotesDB.find({});
};

const initialData = [
  {
    quote: "There are three kinds of lies: Lies, Damned Lies, and Statistics.”",
    author: "Mark Twain",
  },
  {
    quote: "If you're going through Hell, keep going.",
    author: "Winston Churchill",
  },
  {
    quote:
      "Tact is the ability to tell someone to go to hell in such a way that they look forward to the trip.",
    author: "Winston Churchill",
  },
  {
    quote: "Hard work beats talent when talent doesn't work hard.",
    author: "Tim Notke",
  },
  {
    quote:
      "Success is not final, failure is not fatal: it is the courage to continue that counts.",
    author: "Winston Churchill",
  },
];

module.exports.seedDatabaseIfEmpty = async () => {
  const allQuotes = await getAllQuotes();
  if (allQuotes.length > 0) {
    return;
  }

  quotesDB.insertMany(initialData);
  return;
};
