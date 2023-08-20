const express = require("express");
const router = express.Router();

const productControllers = require("../Controllers/product");
const authControllers = require("../Controllers/auth");

router.get("/:id", productControllers.getProduct);

router.get("/", productControllers.getAllProducts);

router.post("/", authControllers.protect, productControllers.createProduct);

router.put("/:id", productControllers.updateProduct);

router.delete(
  "/:id",
  authControllers.protect,
  authControllers.restrictTo("admin"),
  productControllers.deleteProduct
);

router.get("/category/:category", productControllers.getProductsByCategory);
module.exports = router;
