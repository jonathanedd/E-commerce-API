const express = require("express");

// error controller
const { globalErrorHandler } = require("./controllers/errors.controller");

// Routers
const { usersRouter } = require("./routes/user.routes");
const { productsRouter } = require("./routes/product.routes");
const { categoriesRouter } = require("./routes/category.routes");

const app = express();

app.use(express.json());

// URL endpoints
// http://localhost:2020/api/v4/users
app.use("/api/v4/users", usersRouter);
app.use("/api/v4/products", productsRouter);
app.use("/api/v4/categories", categoriesRouter);

app.use("*", globalErrorHandler);

module.exports = { app };
