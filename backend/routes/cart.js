const express = require("express");
const {
  addProduct,
  getCart,
  deleteProductFromCart,
  deleteCart,
  updateCartItemQuantity,
} = require("../controllers/cart");
const auth = require("../middleware/authentication");
const authorization = require("../middleware/authorization");
const accountLockCheck = require("../middleware/accountLockCheck");
const cartRouter = express.Router();

cartRouter.post("/", auth, addProduct);

cartRouter.get("/", auth, getCart);

cartRouter.put("/:id", auth, updateCartItemQuantity);

cartRouter.delete("/:id", auth, deleteProductFromCart);

cartRouter.delete("/", auth, deleteCart);

module.exports = cartRouter;
