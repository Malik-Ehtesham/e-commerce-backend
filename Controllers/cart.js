const Cart = require("../Models/cart");

const catchAsync = require("../Utils/catchAsync");

exports.createCart = async (req, res) => {
  const userId = req.user._id; // Assuming you get the user ID from the authenticated user

  // Check if a cart already exists for the user
  const existingCart = await Cart.findOne({ user: userId });

  if (existingCart) {
    return res
      .status(400)
      .json({ message: "Cart already exists for this user" });
  }

  // Create a new cart for the user
  const newCart = new Cart({ user: userId, items: [] });
  await newCart.save();

  res.status(201).json({ message: "Cart created successfully", cart: newCart });
};

exports.getCurrentUserCart = catchAsync(async (req, res) => {
  const userId = req.user._id; // Assuming you get the user ID from the authenticated user

  const cart = await Cart.findOne({ user: userId }).populate("items.product");

  if (!cart) {
    return res.status(404).json({ message: "Cart not found" });
  }

  res.status(200).json({ cart });
});

exports.addToCart = catchAsync(async (req, res) => {
  const userId = req.user._id; // Assuming you get the user ID from the authenticated user
  const { product, quantity } = req.body;

  let cart = await Cart.findOne({ user: userId });

  if (!cart) {
    cart = new Cart({ user: userId, items: [] });
  }

  const existingCartItem = cart.items.find((item) =>
    item.product.equals(product)
  );

  if (existingCartItem) {
    return res.status(400).json({ message: "Product is already in cart" });
  }

  // Add a new cart item
  cart.items.push({ product, quantity });

  await cart.save();

  res.status(200).json({ cart });
});

// Add more controllers for updating and deleting cart items as needed...

exports.updateCartItem = catchAsync(async (req, res) => {
  const userId = req.user._id; // Assuming you get the user ID from the authenticated user
  const { itemId } = req.params;
  const { quantity } = req.body;

  const cart = await Cart.findOne({ user: userId }).populate("items.product");

  if (!cart) {
    return res.status(404).json({ message: "Cart not found" });
  }

  const cartItem = cart.items.find((item) => item._id.equals(itemId));
  if (!cartItem) {
    return res.status(404).json({ message: "Cart item not found" });
  }

  cartItem.quantity = quantity;
  await cart.save();

  res.status(200).json({ cart });
});

exports.deleteCartItem = catchAsync(async (req, res) => {
  const userId = req.user._id; // Assuming you get the user ID from the authenticated user
  const { itemId } = req.params;

  const cart = await Cart.findOne({ user: userId }).populate("items.product");

  if (!cart) {
    return res.status(404).json({ message: "Cart not found" });
  }

  const cartItemIndex = cart.items.findIndex((item) => item._id.equals(itemId));
  if (cartItemIndex === -1) {
    return res.status(404).json({ message: "Cart item not found" });
  }

  cart.items.splice(cartItemIndex, 1);
  await cart.save();

  res.status(200).json({ cart });
});

exports.clearCart = catchAsync(async (req, res) => {
  const userId = req.user._id; // Assuming you get the user ID from the authenticated user

  const cart = await Cart.findOne({ user: userId });

  if (!cart) {
    return res.status(404).json({ message: "Cart not found" });
  }

  cart.items = []; // Clearing all items in the cart
  await cart.save();

  res.status(200).json({ message: "Cart cleared successfully", cart });
});
