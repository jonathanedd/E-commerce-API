const express = require("express");

// Controllers
const {
  createNewProduct,
  getAllProducts,
  getProductById,
  UpdateProduct,
  deleteProduct,
} = require("../controllers/product.controller");

// Token Middlewares
const { protectToken } = require("../middlewares/user.middleware");

// Validations middleware
const {
  createProductValidation,
  checkValidations,
} = require("../middlewares/validations.middleware");

// Protect product Owner
const {
  productExist,
  protectProductOwner,
} = require("../middlewares/product.middleware");

const router = express.Router();

router.get("/", getAllProducts);

router.get("/:id", getProductById);

router.use(protectToken);

router.post("/", createProductValidation, checkValidations, createNewProduct);

router
  .route("/:id")
  .patch(productExist, protectProductOwner, UpdateProduct)
  .delete(productExist, protectProductOwner, deleteProduct);

module.exports = { productsRouter: router };
