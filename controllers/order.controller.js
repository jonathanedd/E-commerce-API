const { ProductsInCart } = require("../models/productsInCart.model");
const { Cart } = require("../models/cart.model");
const { User } = require("../models/user.model");
const { Product } = require("../models/product.model");

const { catchAsync } = require("../utils/catchAsync");
const { AppError } = require("../utils/appError");

const addUserCart = catchAsync(async (req, res, next) => {
  const { sessionUser } = req;

  const userHasCart = await Cart.findOne({
    where: { userId: sessionUser.id, status: "active" },
    include: [
      {
        model: User,
        attributes: { exclude: ["password"] },
      },
    ],
  });

  if (!userHasCart) {
    const createCart = await Cart.create({ userId: sessionUser.id });

    res.status(200).json({
      status: "Added",
      userHasCart: createCart,
    });
  } else {
    return next(new AppError("you already have one cart Active", 403));
  }
});

const addProductToCart = catchAsync(async (req, res, next) => {});

const updateProductToCart = catchAsync(async (req, res, next) => {});
const purchaseCart = catchAsync(async (req, res, next) => {});
const deleteProductToCart = catchAsync(async (req, res, next) => {});

module.exports = {
  addUserCart,
  addProductToCart,
  updateProductToCart,
  purchaseCart,
  deleteProductToCart,
};
