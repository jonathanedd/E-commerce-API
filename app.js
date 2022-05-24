const express = require("express");

// error controller

// Routers
const { usersRouter } = require("./routes/user.routes");

const app = express();

app.use(express.json());

// URL endpoints
// http://localhost:2020/api/v4/users
app.use("/api/v4/users", usersRouter);

module.exports = { app };
