const { Category } = require("../models/category.model");

// utils
const { catchAsync } = require("../utils/catchAsync");
const { AppError } = require("../utils/appError");

const categoryExist = catchAsync(async (req, res, next) => {
  const { id } = req.params;

  const category = await Category.findOne({
    where: { id, status: "active" },
  });

  if (!category) {
    return next(new AppError("No category was found with Id", 404));
  }

  req.category = category;

  next();
});

module.exports = { categoryExist };
