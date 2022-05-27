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
} = require("../controllers/user.controller");

const router = express.Router();

// HTTP petitions
router.post("/", createUserValidation, checkValidations, createUser);

router.post("/login", login);

// ProtectToken
router.use(protectToken);

router.get("/", getAllUsers);

router.patch("/:id", userExist, updateUserProfile);

module.exports = { usersRouter: router };
