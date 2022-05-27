const { Product } = require("../models/product.model");
const { Category } = require("../models/category.model");

const { catchAsync } = require("../utils/catchAsync");

const createNewProduct = catchAsync(async (req, res, next) => {
  const { title, description, price, quantity, categoryId } = req.body;

  const { sessionUser } = req;

  const newProduct = await Product.create({
    title,
    description,
    price,
    quantity,
    categoryId, // Pending to be modified
    userId: sessionUser.id,
  });

  res.status(200).json({
    status: "success",
    newProduct,
  });
});

const getAllProducts = catchAsync(async (req, res, next) => {
  const products = await Product.findAll({
    where: { status: "active" },
    include: [
      {
        model: Category,
        attributes: ["name"],
      },
    ],
  });
  res.status(200).json({
    status: "success",
    products,
  });
});

const getProductById = catchAsync(async (req, res, next) => {
  const { id } = req.params;

  const product = await Product.findOne({ where: { id } });

  res.status(200).json({
    status: "success",
    product,
  });
});

const UpdateProduct = catchAsync(async (req, res, next) => {
  const { title, description, price, quantity } = req.body;
  const { product } = req;

  await product.update({
    title,
    description,
    price,
    quantity,
  });
  res.status(200).json({
    status: "Updated",
    product,
  });
});

const deleteProduct = catchAsync(async (req, res, next) => {
  const { product } = req;

  await product.update({
    status: "Product deleted!",
  });
  res.status(200).json({
    status: "Deleted!",
  });
});

module.exports = {
  createNewProduct,
  getAllProducts,
  getProductById,
  UpdateProduct,
  deleteProduct,
};
