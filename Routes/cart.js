// routes/cartRoutes.js
const express = require("express");
const router = express.Router();
const cartControllers = require("../Controllers/cart");
const authControllers = require("../Controllers/auth");

// Create a new cart for the user
router.post(
  "/create-cart",
  authControllers.protect,
  cartControllers.createCart
);

// Get current user's cart
router.get(
  "/my-cart",
  authControllers.protect,
  cartControllers.getCurrentUserCart
);

// Add item to cart
router.post("/add-to-cart", authControllers.protect, cartControllers.addToCart);

// Update cart item quantity
router.patch(
  "/update-cart-item/:itemId",
  authControllers.protect,
  cartControllers.updateCartItem
);

// Delete cart item
router.delete(
  "/delete-cart-item/:itemId",
  authControllers.protect,
  cartControllers.deleteCartItem
);

// Clear the entire cart
router.delete(
  "/clear-cart",
  authControllers.protect,
  cartControllers.clearCart
);

// UNDERSTAND HOW YOUR CART WORKS
module.exports = router;
