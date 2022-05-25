const express = require("express");

// Controllers
const { createUser } = require("../controllers/user.controller");

const router = express.Router();

// HTTP petitions
router.post("/", createUser);

module.exports = { usersRouter: router };
