const { Product } = require("../models/product.model");

const { catchAsync } = require("../utils/catchAsync");
const { AppError } = require("../utils/appError");

const productExist = catchAsync(async (req, res, next) => {
  const { id } = req.params;
  const product = await Product.findOne({
    where: { id, status: "active" },
  });

  if (!product) {
    return next(new AppError("Product not found with Id", 404));
  }

  req.product = product;

  next();
});

const protectProductOwner = catchAsync(async (req, res, next) => {
  const { sessionUser, product } = req;

  if (sessionUser.id === product.id) {
    return next(new AppError("You dont own this account", 404));
  }

  next();
});

module.exports = {
  productExist,
  protectProductOwner,
  // protectUserSessionProducts,
};
