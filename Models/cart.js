const mongoose = require("mongoose");

const cartSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User", // Reference to User model
    required: true,
  },
  items: [
    {
      product: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Product", // Reference to Product model
        required: true,
      },
      quantity: {
        type: Number,
        required: true,
      },
      // ... other fields specific to cart items ...
    },
  ],
  status: String,
  // ... other fields specific to the cart ...
});

const Cart = mongoose.model("Cart", cartSchema);

module.exports = Cart;
