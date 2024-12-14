const mongoose = require("mongoose");
const reviewSchema = new mongoose.Schema({
  productId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Product",
    required: true,
  },
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  userName: { type: String },
  rating: { type: Number },
  comment: { type: String },
});

const Review = mongoose.model("Review", reviewSchema);
module.exports = Review;
