const mongoose = require("mongoose");
const wishListSchema = new mongoose.Schema(
  {
    products: [
      {
        productId: String,
      },
    ],
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("WishList", wishListSchema);
