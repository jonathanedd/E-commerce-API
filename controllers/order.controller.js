const { ProductsInCart } = require("../models/productsInCart.model");
const { Cart } = require("../models/cart.model");
const { User } = require("../models/user.model");
const { Product } = require("../models/product.model");
const { Order } = require("../models/order.model");

const { catchAsync } = require("../utils/catchAsync");
const { AppError } = require("../utils/appError");
const { status } = require("express/lib/response");

const addUserCart = catchAsync(async (req, res, next) => {});

const addProductToCart = catchAsync(async (req, res, next) => {
  const { productId, quantity } = req.body;
  const { sessionUser } = req;

  const userHasCart = await Cart.findOne({
    where: { userId: sessionUser.id, status: "active" },
    include: [
      {
        model: ProductsInCart,
        where: { status: "active" },
        attributes: { include: ["cartId"] },
      },
    ],
  });

  if (!userHasCart) {
    const createCart = await Cart.create({ userId: sessionUser.id });

    res.status(200).json({
      status: "Added",
      createCart,
    });
  } else {
    const productInCart = await ProductsInCart.create({
      cartId: userHasCart.id,
      productId,
      quantity,
    });

    const findProduct = await ProductsInCart.findAll({
      where: { productId },
      include: [
        {
          model: Product,
          attributes: {
            exclude: ["categoryId", "createdAt", "updatedAt"],
          },
        },
      ],
    });

    const productExist = await Product.findOne({
      where: { status: "active" },
    });

    if (!productExist) {
      return next(new AppError("Invalid product", 404));
    } else if (productInCart.quantity > productExist.quantity) {
      next(
        new AppError(`This product only has ${productExist.quantity} units`)
      );
    }

    res.status(200).json({
      status: "Product added to cart",
      productInCart,
      findProduct,
    });
  }
});

//--------Update Product

const updateProductToCart = catchAsync(async (req, res, next) => {
  const { productId, newQty } = req.body;

  const { sessionUser } = req;

  const userCart = await Cart.findOne({
    where: { userId: sessionUser.id, status: "active" },
    include: [
      {
        model: ProductsInCart,
      },
    ],
  });

  const productInCart = await ProductsInCart.findOne({
    where: { status: "active", cartId: userCart.id, productId },
    include: [
      {
        model: Product,
      },
    ],
  });

  if (!productInCart) {
    return next(new AppError("Product is not in your cart", 404));
  }

  if (newQty < 0 || newQty > productInCart.product.quantity) {
    return next(
      new AppError(
        `There are only ${productInCart.product.quantity} units available`,
        400
      )
    );
  }

  if (newQty === 0) {
    await produc;
    tInCart.update({ quantity: 0, status: "removed" });
  } else if (newQty > 0) {
    await productInCart.update({
      quantity: newQty,
    });
  }
  res.status(200).json({
    status: "Cart udapted",
    productInCart,
  });
});

//-------- Purchase

const purchaseCart = catchAsync(async (req, res, next) => {
  const { sessionUser } = req;

  // Find user cart and get products in Cart
  const cart = await Cart.findOne({
    where: { status: "active", userId: sessionUser.id },
    include: [
      {
        model: ProductsInCart,
        where: { status: "active" },
        include: [{ model: Product }],
      },
    ],
  });

  if (!cart) {
    return next(new AppError("Thre is no cart yet", 400));
  }

  //Get product in cart
  // const productIncart = await ProductsInCart.findAll({
  //   where: { cartId: cart.id },
  // });

  // Loop the products in cart to do the following (map async)

  let totalPrice = 0;

  const cartPromises = cart.productInCart.map(async (product) => {
    const newQty = product.product.quantity - product.quantity;
    await product.product.update({ quantity: newQty });

    const priceProduct = product.quantity * +product.product.price;
    totalPrice += priceProduct;

    return await product.update({ status: "purchased" });
  });

  await Promise.all(cartPromises);

  const order = await Order.create({
    userId: sessionUser.id,
    cartId: cart.id,
    totalPrice,
  });

  await cart.update({ status: "purchased" });

  res.status(200).json({
    status: "success",
    order,
  });
});

//--------Delete Product

const deleteProductToCart = catchAsync(async (req, res, next) => {
  // const { productId } = req.body;

  const { sessionUser } = req;

  const cart = await Cart.findOne({
    where: { userId: sessionUser.id, status: "active" },
  });

  if (!cart) {
    return next(new AppError("Please get a shopping cart", 404));
  }

  const removeProduct = ProductsInCart.findOne({
    where: { status: "active ", cartId: cart.id },
    include: [
      {
        model: Product,
      },
    ],
  });

  if (!removeProduct) {
    return next(new AppError("Product is not in cart", 404));
  } else {
    await removeProduct.update({
      status: "Product removed",
    });
  }

  res.status(200).json({
    status: "success",
    removeProduct,
  });
});

module.exports = {
  addUserCart,
  addProductToCart,
  updateProductToCart,
  purchaseCart,
  deleteProductToCart,
};
