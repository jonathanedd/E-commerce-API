const express = require("express");

// controllers
const { createCategory } = require("../controllers/category.controller");

const { protectToken } = require("../middlewares/user.middleware");

const router = express.Router();

router.use(protectToken);

router.post("/", createCategory);

module.exports = { categoriesRouter: router };
