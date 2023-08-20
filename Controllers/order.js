const Order = require("../Models/order");
const Product = require("../Models/product");
const catchAsync = require("../Utils/catchAsync");

// Controller function to create a new order
exports.createOrder = catchAsync(async (req, res) => {
  const { products, totalPrice, shippingAddress } = req.body;

  // Fetch the product information for each product in the order
  const orderedProducts = await Promise.all(
    products.map(async (productEl) => {
      const { product, quantity } = productEl;
      const productInfo = await Product.findById(product);
      return { product: productInfo, quantity };
    })
  );

  const newOrder = new Order({
    user: req.user._id,
    products,
    totalPrice,
    shippingAddress,
  });

  const savedOrder = await newOrder.save();
  res.status(201).json(savedOrder);
});

// Controller function to get all orders
exports.getAllOrders = catchAsync(async (req, res) => {
  const orders = await Order.find()
    .populate("user", "username email")
    .populate("products.product", "title price");
  res.status(200).json(orders);
});

// Controller function to get a single order by ID
exports.getSingleOrder = catchAsync(async (req, res) => {
  const orderId = req.params.id;

  const order = await Order.findById(orderId)
    .populate("user", "username email")
    .populate("products.product", "title price");
  if (!order) {
    return res.status(404).json({ error: "Order not found." });
  }
  res.status(200).json(order);
});

// Controller function to update the status of an order
exports.updateOrderStatus = catchAsync(async (req, res) => {
  const orderId = req.params.id;
  const { status } = req.body;

  const updatedOrder = await Order.findByIdAndUpdate(
    orderId,
    { status },
    { new: true }
  );
  if (!updatedOrder) {
    return res.status(404).json({ error: "Order not found." });
  }
  res.status(200).json(updatedOrder);
});

// Controller function to delete an order by ID
exports.deleteOrder = catchAsync(async (req, res) => {
  const orderId = req.params.id;

  const deletedOrder = await Order.findByIdAndDelete(orderId);
  if (!deletedOrder) {
    return res.status(404).json({ error: "Order not found." });
  }
  res.status(200).json({ message: "Order deleted successfully." });
});

// Controller function to get orders for the current authenticated user
exports.getUserOrders = catchAsync(async (req, res, next) => {
  const userId = req.user._id; // Get the user ID from the authenticated user

  const orders = await Order.find({ user: userId })
    .populate("products.product", "title image")
    .exec();

  res.status(200).json(orders);
});
