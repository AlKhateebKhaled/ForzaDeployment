const mongoose = require("mongoose");
const productSchema = new mongoose.Schema({
  team: { type: String, required: true },
  description: { type: String },
  Season: { type: String },
  Type: { type: String },
  Brand: { type: String },
  League: { type: String },
  price: { type: Number },
  stock: { type: Number },
  categoryID: [{ type: mongoose.Schema.Types.ObjectId, ref: "Category" }],
  imageURL: { type: String },
  reviews: [{ type: mongoose.Schema.Types.ObjectId, ref: "Review" }]
});

const Product = mongoose.model("Product", productSchema);
module.exports = Product;
