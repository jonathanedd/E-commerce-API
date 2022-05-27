const { catchAsync } = require("../utils/catchAsync");

const createNewProduct = catchAsync(async (req, res, next) => {});

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
