const mongoose = require("mongoose");
const productSchema = new mongoose.Schema(
  {
    brand: {
      type: String,
    },
    price: {
      type: Number,
    },
    companymodel: {
      type: String,
    },
    colorway: {
      type: String,
    },
    about: {
      type: String,
    },
    country: {
      type: String,
    },
    photos: [String],
  },
  { timestamps: true }
);

module.exports = mongoose.model("ProductModel", productSchema);
