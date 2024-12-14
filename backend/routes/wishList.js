const express = require("express");
const {
  addProductToWishList,
  getWishList,
  deleteProductFromWishList,
} = require("../controllers/wishList");
const auth = require("../middleware/authentication");
const authorization = require("../middleware/authorization");
const accountLockCheck = require("../middleware/accountLockCheck");
const wishRouter = express.Router();

wishRouter.post("/", auth,  addProductToWishList);

wishRouter.get("/", auth,  getWishList);

wishRouter.delete("/:id", auth,  deleteProductFromWishList);

module.exports = wishRouter;
