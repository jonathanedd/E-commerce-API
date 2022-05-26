const express = require("express");

// Controllers
const { createUser } = require("../controllers/user.controller");

// Validations middleware
const {
  createUserValidation,
  checkValidations,
} = require("../middlewares/validations.middleware");

const router = express.Router();

// HTTP petitions
router.post("/", createUserValidation, checkValidations, createUser);

router.post("login");

module.exports = { usersRouter: router };
