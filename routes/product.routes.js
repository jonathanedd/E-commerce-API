const express = require("express");

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

// Here goes protectToken

router.post("/", createNewProduct);

router.route("/:id").patch(UpdateProduct).delete(deleteProduct);
