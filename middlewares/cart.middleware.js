const { Cart } = require("../models/cart.model");

// utils
const { catchAsync } = require("../utils/catchAsync");
const { AppError } = require("../utils/appError");

const userCartExist = catchAsync(async (req, res, next) => {
  const { id } = req.params;

  const { user } = req;

  const activeCart = await Cart.findOne({
    where: { status: "active" },
  });

  return next(new AppError("You already have one Cart active", 403));
});

module.exports = { userCartExist };
