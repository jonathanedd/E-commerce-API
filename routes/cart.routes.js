const express = require("express");

// Controllers
const {
  addProductToCart,
  updateProductToCart,
  purchaseCart,
  deleteProductToCart,
  addUserCart,
} = require("../controllers/order.controller");

// Middlewares
const { protectToken } = require("../middlewares/user.middleware");

router = express.Router();

router.use(protectToken);

//HTTP Petitions
router.post("/add-cart", addUserCart);
router.post("/add-product", addProductToCart);

router.patch("/update-cart", updateProductToCart);
router.delete("/:productId", deleteProductToCart);
router.post("/purchase", purchaseCart);


module.exports = { cartRouter: router };
