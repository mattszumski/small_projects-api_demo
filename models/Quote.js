const mongoose = require("mongoose");
const { Schema } = mongoose;

const quoteSchema = new Schema({
  quote: {
    type: String,
    required: true,
  },
  author: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: () => Date.now(),
  },
  modifiedAt: Date,
});

quoteSchema.statics.findByAuthor = function (authorName) {
  return this.find({
    author: { $regex: ".*" + authorName + ".*", $options: "i" },
  });
};

module.exports = mongoose.model("Quote", quoteSchema);
