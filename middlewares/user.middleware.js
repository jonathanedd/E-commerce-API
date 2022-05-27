const { User } = require("../models/user.model");

const jwt = require("jsonwebtoken");

// Utils
const { catchAsync } = require("../utils/catchAsync");
const { AppError } = require("../utils/appError");

const protectToken = catchAsync(async (req, res, next) => {
  let token;

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    token = req.headers.authorization.split(" ")[1];
  }

  if (!token) {
    return next(new AppError("Invalid Session", 403));
  }

  const decoded = await jwt.verify(token, process.env.JWT_SECRET);

  const user = await User.findOne({
    where: { id: decoded.id, status: "active" },
  });

  if (!user) {
    return next(new AppError("Owners token is no longer available", 403));
  }

  req.sessionUser = user;

  next();
});

const userExist = catchAsync(async (req, res, next) => {
  const { id } = req.params;
  const user = await User.findOne({
    where: { id, status: "active" },
    // Attributes
  });

  if (!user) {
    return next(new AppError("User not found with Id", 404));
  }

  req.user = user;
  next();
});

module.exports = { userExist, protectToken };
