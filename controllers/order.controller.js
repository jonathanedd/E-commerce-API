const { Order } = require("../models/order.model");

const { catchAsync } = require("../utils/catchAsync");

const addProductToCart = catchAsync(async (req, res, next) => {
  const {} = req.body;
  res.status(200).json({
    status: "success",
  });
});
const updateProductToCart = catchAsync(async (req, res, next) => {});
const purchaseCart = catchAsync(async (req, res, next) => {});
const deleteProductToCart = catchAsync(async (req, res, next) => {});

module.exports = {
  addProductToCart,
  updateProductToCart,
  purchaseCart,
  deleteProductToCart,
};
