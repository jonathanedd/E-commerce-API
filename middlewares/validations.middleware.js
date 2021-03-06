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

const createProductValidation = [
  body("title").notEmpty().withMessage("Please enter a product name"),
  body("description").notEmpty().withMessage("Please enter a description"),
  body("price")
    .notEmpty()
    .isFloat({ min: 0 })
    .withMessage("please enter a price greater than 0"),
  body("quantity")
    .isInt({ min: 1 })
    .withMessage("Please enter quantity greater than 1"),
  body("categoryId")
    .isInt({ min: 1 })
    .withMessage("Must provide a valid category"),
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

module.exports = {
  createUserValidation,
  createProductValidation,
  checkValidations,
};
