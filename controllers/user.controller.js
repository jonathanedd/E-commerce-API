const { User } = require("../models/user.model");
const { Product } = require("../models/product.model");

const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const { catchAsync } = require("../utils/catchAsync");
const { AppError } = require("../utils/appError");

const createUser = catchAsync(async (req, res, next) => {
  const { userName, email, password } = req.body;

  const salt = await bcrypt.genSalt(12);
  const hashPassword = await bcrypt.hash(password, salt);

  const newUser = await User.create({
    userName,
    email,
    password: hashPassword,
  });

  newUser.password = undefined;

  res.status(200).json({
    status: "success",
    newUser,
  });
});

const login = catchAsync(async (req, res, next) => {
  const { email, password } = req.body;

  const user = await User.findOne({ where: { email, status: "active" } });

  if (!user || !(await bcrypt.compare(password, user.password))) {
    return next(new AppError("Invalid Credentials", 400));
  }

  const token = await jwt.sign({ id: user.id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  });

  user.password = undefined;

  res.status(200).json({
    status: "success",
    token,
    user,
  });
});

const getAllUserProducts = catchAsync(async (req, res, next) => {
  const products = await User.findAll({
    // include: [{ model: Product, attributes: ["title", "price"] }],
  });

  res.status(200).json({
    status: "success",
    products,
  });
});

module.exports = { createUser, login, getAllUserProducts };
