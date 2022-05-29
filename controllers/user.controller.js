const { User } = require("../models/user.model");
const { Product } = require("../models/product.model");

const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");

const { catchAsync } = require("../utils/catchAsync");
const { AppError } = require("../utils/appError");

dotenv.config({ path: "./config.env" });

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
    status: "Created!",
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
    status: "logged in!",
    token,
    user,
  });
});

const getAllUsers = catchAsync(async (req, res, next) => {
  const users = await User.findAll({
    attributes: { exclude: ["password"] },
  });

  res.status(200).json({
    status: "success",
    users,
  });
});

const updateUserProfile = catchAsync(async (req, res, next) => {
  const { user } = req;
  const { userName, email } = req.body;

  await user.update({ userName, email });

  res.status(200).json({
    status: "Updated!",
  });
});

const deleteUserProfile = catchAsync(async (req, res, next) => {
  const { user } = req;

  await user.update({
    status: "Account deleted!",
  });

  res.status(200).json({
    status: "Deleted!",
  });
});

const getUserProducts = catchAsync(async (req, res, next) => {
  const userProducts = await User.findAll({
    where: { status: "active" },
    attributes: { exclude: ["password"] },
    include: [
      {
        model: Product,
        attributes: { include: ["title"] },
      },
    ],
  });

  res.status(200).json({
    status: "Success",
    userProducts,
  });
});

const getUserOrders = catchAsync(async (req, res, next) => {
  res.status(200).json({
    status: "success",
  });
});

const getUserOrderById = catchAsync(async (req, res, next) => {
  res.status(200).json({
    status: "success",
  });
});

module.exports = {
  createUser,
  login,
  getAllUsers,
  updateUserProfile,
  deleteUserProfile,
  getUserProducts,
  getUserOrders,
  getUserOrderById,
};
