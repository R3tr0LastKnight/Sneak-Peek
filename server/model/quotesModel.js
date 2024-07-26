const mongoose = require("mongoose");
const quoteSchema = new mongoose.Schema(
  {
    id: Number,
    quote: String,
    language: String,
  },
  { timestamps: true }
);

module.exports = mongoose.model("Quotes", quoteSchema);
