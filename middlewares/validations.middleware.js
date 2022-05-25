const { body, validationResult } = require("express-validator");

const { AppError } = require("../utils/appError");

const createUserValidation = [
  body("userName").notEmpty().withMessage("Please enter your username"),
  body("email")
    .notEmpty()
    .withMessage("Please enter your email")
    .isEmail()
    .withMessage("Email is not valid"),
  body("password")
    .notEmpty()
    .withMessage("Please enter password")
    .isLength({ min: 6, max: 16 })
    .matches(/\d/)
    .withMessage(
      "Password must be between 6 and 16 characters long and must contain at least one number"
    ),
  body("password")
    .matches(/(?=.*[A-Z])/)
    .withMessage("Password must contain at least one Uppercase"),
];

const checkValidations = (req, res, next) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    const messages = errors.array().map(({ msg }) => msg);

    const errorMsg = messages.join(". ");

    return next(new AppError(errorMsg, 400));
  }
  next();
};

module.exports = { createUserValidation, checkValidations };
