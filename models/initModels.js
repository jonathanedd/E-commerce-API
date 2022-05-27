const { User } = require("./user.model");
const { ProductsInCart } = require("./productsInCart.model");
const { Product } = require("./product.model");
const { Order } = require("./order.model");
const { Cart } = require("./cart.model");
const { Category } = require("./category.model");

const initModels = () => {};

User.hasMany(Product);
Product.belongsTo(User);

User.hasMany(Order);
Order.belongsTo(User);

User.hasOne(Cart);
Cart.belongsTo(User);

// Product.hasmany(Images)
// Imags.belongsto(Product)

Category.hasOne(Product);
Product.belongsTo(Category);

// Product.hasOne(Category);
// Category.belongsTo(Product);

Cart.hasMany(ProductsInCart);
ProductsInCart.belongsTo(Cart);

Product.hasOne(ProductsInCart);
ProductsInCart.belongsTo(Product);

Cart.hasOne(Order);
Order.belongsTo(Cart);

module.exports = { initModels };
