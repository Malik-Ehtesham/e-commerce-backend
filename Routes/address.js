// addressRoutes.js
const express = require("express");
const router = express.Router();
const addressControllers = require("../controllers/addressControllers");

// Route for creating a new address
router.post("/", addressControllers.createAddress);

// Route for fetching all addresses
router.get("/", addressControllers.getAllAddresses);

// Route for fetching a single address by ID
router.get("/:id", addressControllers.getAddressById);

// Route for updating an address by ID
router.put("/:id", addressControllers.updateAddressById);

// Route for deleting an address by ID
router.delete("/:id", addressControllers.deleteAddressById);

module.exports = router;
