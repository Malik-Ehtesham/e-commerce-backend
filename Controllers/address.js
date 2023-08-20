// addressControllers.js
const Address = require("../models/addressModel");

// Controller for creating a new address
exports.createAddress = async (req, res) => {
  try {
    const { street, city, state, zipCode } = req.body;
    const newAddress = await Address.create({ street, city, state, zipCode });
    res.status(201).json(newAddress);
  } catch (error) {
    res.status(500).json({ error: "Unable to create the address." });
  }
};

// Controller for fetching all addresses
exports.getAllAddresses = async (req, res) => {
  try {
    const addresses = await Address.find();
    res.status(200).json(addresses);
  } catch (error) {
    res.status(500).json({ error: "Unable to fetch addresses." });
  }
};

// Controller for fetching a single address by ID
exports.getAddressById = async (req, res) => {
  try {
    const addressId = req.params.id;
    const address = await Address.findById(addressId);
    if (!address) {
      return res.status(404).json({ error: "Address not found." });
    }
    res.status(200).json(address);
  } catch (error) {
    res.status(500).json({ error: "Unable to fetch the address." });
  }
};

// Controller for updating an address by ID
exports.updateAddressById = async (req, res) => {
  try {
    const addressId = req.params.id;
    const { street, city, state, zipCode } = req.body;
    const updatedAddress = await Address.findByIdAndUpdate(
      addressId,
      { street, city, state, zipCode },
      { new: true }
    );
    if (!updatedAddress) {
      return res.status(404).json({ error: "Address not found." });
    }
    res.status(200).json(updatedAddress);
  } catch (error) {
    res.status(500).json({ error: "Unable to update the address." });
  }
};

// Controller for deleting an address by ID
exports.deleteAddressById = async (req, res) => {
  try {
    const addressId = req.params.id;
    const deletedAddress = await Address.findByIdAndDelete(addressId);
    if (!deletedAddress) {
      return res.status(404).json({ error: "Address not found." });
    }
    res.status(200).json({ message: "Address deleted successfully." });
  } catch (error) {
    res.status(500).json({ error: "Unable to delete the address." });
  }
};
