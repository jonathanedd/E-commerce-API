const { User } = require("../models/user.model");

const { catchAsync } = require("../utils/catchAsync");
const { AppError } = require("../utils/appError");

const userExist = catchAsync(async (req, res, next) => {});

module.exports = { userExist };
