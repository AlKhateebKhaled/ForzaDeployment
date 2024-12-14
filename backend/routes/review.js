const express = require("express");

const auth = require("../middleware/authentication");
const authorization = require("../middleware/authorization");
const accountLockCheck = require("../middleware/accountLockCheck");
const reviewRouter = express.Router();
const {
  createReview,
  getProductReviews,
  updateReview,
  deleteReview,
} = require("../controllers/review");

reviewRouter.post("/:id", auth,  createReview);

reviewRouter.get("/:id", auth,  getProductReviews);

reviewRouter.put("/:reviewId", auth,  updateReview);

reviewRouter.delete("/:reviewId", auth, deleteReview);

module.exports = reviewRouter;
