const mongoose = require("mongoose");
const cartSchema = new mongoose.Schema(
  {
    products: [
      {
        productId: String,
        size: Number,
      },
    ],
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Cart", cartSchema);
