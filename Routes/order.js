// routes/orderRoutes.js
const express = require("express");
const router = express.Router();

const orderControllers = require("../Controllers/order");
const authControllers = require("../Controllers/auth");

router.get(
  "/my-orders",
  authControllers.protect,
  orderControllers.getUserOrders
);

// Route to get all orders (requires admin authentication)
router.get(
  "/",
  authControllers.protect,
  authControllers.restrictTo("admin"),
  orderControllers.getAllOrders
);

// Route to get a single order by ID
router.get("/:id", authControllers.protect, orderControllers.getSingleOrder);

// Route to create a new order
router.post("/", authControllers.protect, orderControllers.createOrder);

// Route to update the status of an order (requires admin authentication)
router.patch(
  "/:id",
  authControllers.protect,
  authControllers.restrictTo("admin"),
  orderControllers.updateOrderStatus
);

// Route to delete an order by ID (requires admin authentication)
router.delete(
  "/:id",
  authControllers.protect,
  authControllers.restrictTo("admin"),
  orderControllers.deleteOrder
);

module.exports = router;
