const { Product } = require("../models/product.model");

const { catchAsync } = require("../utils/catchAsync");

const createNewProduct = catchAsync(async (req, res, next) => {
  const { title, description, price, quantity, categoryId } = req.body;

  const { sessionUser } = req;

  const newProduct = await Product.create({
    title,
    description,
    price,
    quantity,
    categoryId,
    userId: sessionUser.id,
  });

  res.status(200).json({
    status: "success",
    newProduct,
  });
});

const getAllProducts = catchAsync(async (req, res, next) => {});

const getProductById = catchAsync(async (req, res, next) => {});

const UpdateProduct = catchAsync(async (req, res, next) => {});

const deleteProduct = catchAsync(async (req, res, next) => {});

module.exports = {
  createNewProduct,
  getAllProducts,
  getProductById,
  UpdateProduct,
  deleteProduct,
};
