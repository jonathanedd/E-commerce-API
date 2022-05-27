const express = require("express");

// Middlewares
const { protectToken } = require("../middlewares/user.middleware");

// Controllers
const {
  createNewProduct,
  getAllProducts,
  getProductById,
  UpdateProduct,
  deleteProduct,
} = require("../controllers/product.controller");

const router = express.Router();

router.get("/", getAllProducts);

router.get("/:id", getProductById);

router.use(protectToken);

router.post("/", createNewProduct);

router.route("/:id").patch(UpdateProduct).delete(deleteProduct);

module.exports = { productsRouter: router };
