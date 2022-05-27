const express = require("express");

// Controllers
const {
  createUser,
  login,
  getAllUserProducts,
  updateUserProfile,
} = require("../controllers/user.controller");

// Validations middleware
const {
  createUserValidation,
  checkValidations,
} = require("../middlewares/validations.middleware");

const router = express.Router();

// HTTP petitions
router.post("/", createUserValidation, checkValidations, createUser);

router.post("/login", login);

router.get("/me", getAllUserProducts);

router.patch("/:id", updateUserProfile);

module.exports = { usersRouter: router };
