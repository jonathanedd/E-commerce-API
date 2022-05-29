const express = require("express");

// Middlewares
const { userExist, protectToken } = require("../middlewares/user.middleware");

// Validations middleware
const {
  createUserValidation,
  checkValidations,
} = require("../middlewares/validations.middleware");

// Controllers
const {
  createUser,
  login,
  getAllUsers,
  updateUserProfile,
  deleteUserProfile,
  getUserProducts,
} = require("../controllers/user.controller");

const router = express.Router();

// HTTP petitions
router.post("/", createUserValidation, checkValidations, createUser);

router.post("/login", login);

// ProtectToken
router.use(protectToken);

router.get("/me", getUserProducts);

router.get("/", getAllUsers);

router.patch("/:id", userExist, updateUserProfile);

router.delete("/:id", userExist, deleteUserProfile);

module.exports = { usersRouter: router };
