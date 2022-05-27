const { Cart } = require("../models/cart.model");

const { catchAsync } = require("../utils/catchAsync");

const addProductToCart = catchAsync(async (req, res, next) => {});
const updateProductToCart = catchAsync(async (req, res, next) => {});
const purchaseCart = catchAsync(async (req, res, next) => {});
const deleteProductToCart = catchAsync(async (req, res, next) => {});

module.exports = {
  addProductToCart,
  updateProductToCart,
  purchaseCart,
  deleteProductToCart,
};
