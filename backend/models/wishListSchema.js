const mongoose = require("mongoose");
const wishListSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  userName: { type: String },
  products: [
    {
      productId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Product",
        required: true,
        unique: true,
      },
    },
  ],
});

const wishList = mongoose.model("Wish", wishListSchema);
module.exports = wishList;
