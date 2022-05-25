const { User } = require("../models/user.model");

const { catchAsync } = require("../utils/catchAsync");

const createUser = catchAsync(async (req, res, next) => {
  const { userName, email, password } = req.body;

  const newUser = await User.create({
    userName,
    email,
    password,
  });

  res.status(200).json({
    status: "success",
    newUser,
  });
});

module.exports = { createUser };
