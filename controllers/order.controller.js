const { ProductsInCart } = require("../models/productsInCart.model");
const { Cart } = require("../models/cart.model");
const { User } = require("../models/user.model");
const { Product } = require("../models/product.model");

const { catchAsync } = require("../utils/catchAsync");
const { AppError } = require("../utils/appError");
const { status } = require("express/lib/response");

const addUserCart = catchAsync(async (req, res, next) => {});

const addProductToCart = catchAsync(async (req, res, next) => {
  // const { productId, quantity } = req.body;
  // const { sessionUser } = req;

  // const userHasCart = await Cart.findOne({
  //   where: { userId: sessionUser.id, status: "active" },
  //   include: [
  //     {
  //       model: ProductsInCart,
  //       where: { status: "active" },
  //       attributes: { include: ["cartId"] },
  //     },
  //   ],
  // });

  // if (!userHasCart) {
  //   const createCart = await Cart.create({ userId: sessionUser.id });

  //   res.status(200).json({
  //     status: "Added",
  //     createCart,
  //   });
  // } else {
  //   const productInCart = await ProductsInCart.create({
  //     cartId: userHasCart.id,
  //     productId,
  //     quantity,
  //   });

  //   const findProduct = await ProductsInCart.findAll({
  //     where: { productId },
  //     include: [
  //       {
  //         model: Product,
  //         attributes: {
  //           exclude: ["categoryId", "createdAt", "updatedAt"],
  //         },
  //       },
  //     ],
  //   });

  //   res.status(200).json({
  //     status: "Product added to cart",
  //     productInCart,
  //     findProduct,
  //   });
  // }

  const { productId, quantity } = req.body;

  const { sessionUser } = req;

  const userCart = await Cart.findOne({
    where: { userId: sessionUser.id, status: "active" },
    include: [
      {
        model: ProductsInCart,
        where: { status: "active" },
        include: [
          {
            model: Product,
          },
        ],
      },
    ],
  });

  // Validation for cart
  if (!userCart) {
    const assignCart = await Cart.create({ userId: sessionUser.id });

    res.status(200).json({
      status: "Cart added to user",
      assignCart,
    });
  } else {
    const addProduct = await ProductsInCart.create({
      cartId: userCart.id,
      productId,
      quantity,
    });

    res.status(200).json({
      status: "success",
      addProduct,
    });
  }
});

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
