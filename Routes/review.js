const express = require("express");
const router = express.Router();
const reviewControllers = require("../Controllers/review");
const authControllers = require("../Controllers/auth");

router.get(
  "/reviews",
  authControllers.protect,
  authControllers.restrictTo("admin"),
  reviewControllers.getAllReviews
);
// Route to create a new review for a product

router.post(
  "/products/:productId/reviews",
  authControllers.protect,
  reviewControllers.createReview
);

// Route to get all reviews for a product
router.get("/products/:productId/reviews", reviewControllers.getProductReviews);

// Route to update an existing review
router.patch(
  "/reviews/:reviewId",
  authControllers.protect,
  reviewControllers.updateReview
);

// Route to delete a review
router.delete(
  "/reviews/:reviewId",
  authControllers.protect,
  reviewControllers.deleteReview
);

module.exports = router;
