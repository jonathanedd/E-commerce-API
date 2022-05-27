const { Category } = require("../models/category.model");

// Utils
const { catchAsync } = require("../utils/catchAsync");

const createCategory = catchAsync(async (req, res, next) => {
  const { name } = req.body;

  const newCategory = await Category.create({
    name,
  });

  res.status(200).json({
    status: "success",
    newCategory,
  });
});

module.exports = { createCategory };
