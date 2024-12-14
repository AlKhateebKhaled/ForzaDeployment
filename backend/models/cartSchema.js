const mongoose = require("mongoose");
const cartSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  userName: { type: String },
  products: [
    {
      productId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Product",
        required: true,
        default: null,
      },
      quantity: { type: Number, required: true, default: null },
      price: { type: Number, required: true },
      productName: { type: String, default: null },
      productType: { type: String, default: null },
      productSeason: { type: String, default: null },
      productTotal: { type: Number, required: true, default: 0 },
    },
  ],
  totalAmount: { type: Number, required: true, default: 0 },
});

const Cart = mongoose.model("Cart", cartSchema);
module.exports = Cart;
