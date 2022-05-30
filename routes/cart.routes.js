const express = require("express");

// Controllers
const {
  addProductToCart,
  updateProductToCart,
  purchaseCart,
  deleteProductToCart,
} = require("../controllers/order.controller");

// Middlewares

router = express.Router();

//HTTP Petitions
router.post("/add-product", addProductToCart);

router.patch("/update-cart", updateProductToCart);
router.post("/purchase", purchaseCart);
router.delete("/:productId", deleteProductToCart);

module.exports = { cartRouter: router };
