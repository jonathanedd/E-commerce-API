const { Cart } = require("../models/cart.model");

// utils
const { catchAsync } = require("../utils/catchAsync");
const { AppError } = require("../utils/appError");

const userCartExist = catchAsync(async (req, res, next) => {
  const { id } = req.params;
  const cart = await Cart.findOne({
    where: { id, status: "active" },
  });

  if (!cart) {
    return next(new AppError("No cart found with Id ", 403));
  }

  req.cart = cart;

  next();
});

module.exports = { userCartExist };
