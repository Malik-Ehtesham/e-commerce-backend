// controllers/reviewController.js
const Review = require("../Models/review");
const Product = require("../Models/product");
const catchAsync = require("../Utils/catchAsync");

// Controller function to create a new review for a product
exports.createReview = catchAsync(async (req, res) => {
  const { productId } = req.params;
  const { title, rating, comment } = req.body;
  const userId = req.user._id; // Assuming your authentication middleware sets req.user with the authenticated user's information

  // const savedReview = await newReview.save();

  const newReview = await Review.create({
    product: productId,
    user: userId,
    title,
    rating,
    comment,
  });

  // Calculate the average rating for the product and update the product's rating field
  const productReviews = await Review.find({ product: productId });
  const totalRating = productReviews.reduce(
    (sum, review) => sum + review.rating,
    0
  );
  const averageRating = totalRating / productReviews.length;

  await Product.findByIdAndUpdate(productId, { rating: averageRating });

  res.status(201).json(newReview);
});

// Controller function to get all reviews
exports.getAllReviews = catchAsync(async (req, res) => {
  const reviews = await Review.find();

  res.json({
    data: {
      reviews,
    },
  });
});

// Controller function to get all reviews for a product
exports.getProductReviews = catchAsync(async (req, res) => {
  const { productId } = req.params;

  // Fetch all reviews for the specified product
  const reviews = await Review.find({ product: productId });
  res.status(200).json(reviews);
});

// Controller function to update an existing review
exports.updateReview = catchAsync(async (req, res) => {
  const { reviewId } = req.params;
  const { title, rating, comment } = req.body;
  const userId = req.user._id;

  // Check if the review exists and belongs to the authenticated user
  const review = await Review.findById(reviewId);
  if (!review) {
    return res.status(404).json({ error: "Review not found." });
  }

  if (review.user._id.toString() !== userId.toString()) {
    return res
      .status(403)
      .json({ error: "You are not authorized to update this review." });
  }

  // Update the review
  review.title = title;
  review.rating = rating;
  review.comment = comment;

  const updatedReview = await review.save();

  res.status(200).json(updatedReview);
});

// Controller function to delete a review
exports.deleteReview = catchAsync(async (req, res) => {
  const { reviewId } = req.params;
  const userId = req.user._id;

  // Check if the review exists and belongs to the authenticated user
  const review = await Review.findById(reviewId);
  if (!review) {
    return res.status(404).json({ error: "Review not found." });
  }

  if (review.user._id.toString() !== userId.toString()) {
    return res
      .status(403)
      .json({ error: "You are not authorized to delete this review." });
  }

  // Delete the review
  await review.deleteOne();
  res.status(200).json({ message: "Review deleted successfully." });
});
