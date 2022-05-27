const { User } = require("./user.model");
const { ProductsInCart } = require("./productsInCart.model");
const { Product } = require("./product.model");
const { Order } = require("./order.model");
const { Cart } = require("./cart.model");

const initModels = () => {};

User.hasMany(Product);

module.exports = { initModels };
