const express = require("express");

// Middlewares
const {
  userExist,
  protectToken,
  protectAccountOwner,
} = require("../middlewares/user.middleware");

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
  getUserOrders,
  getUserOrderById,
} = require("../controllers/user.controller");

const router = express.Router();

// HTTP petitions
router.post("/", createUserValidation, checkValidations, createUser);

router.post("/login", login);

// ProtectToken
router.use(protectToken);

router.get("/me", getUserProducts);

router.get("/", getAllUsers);

router.patch("/:id", userExist, protectAccountOwner, updateUserProfile);

router.delete("/:id", userExist, protectAccountOwner, deleteUserProfile);

router.get("/orders", getUserOrders);

router.get("/orders/:id", getUserOrderById);

module.exports = { usersRouter: router };
