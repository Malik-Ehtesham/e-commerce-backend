// addressModel.js
const mongoose = require("mongoose");

const addressSchema = new mongoose.Schema({
  street: {
    type: String,
    required: true,
  },
  city: {
    type: String,
    required: true,
  },
  state: {
    type: String,
    required: true,
  },
  zipCode: {
    type: String,
    required: true,
  },
  // You can add more fields as needed for your address model
});

const Address = mongoose.model("Address", addressSchema);

module.exports = Address;
