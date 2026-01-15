const { body, validationResult } = require("express-validator");

const heroValidationRules = () => {
  return [
    body("nickname")
      .notEmpty()
      .withMessage("Nickname is required")
      .isLength({ min: 2, max: 50 })
      .withMessage("Nickname must be between 2 and 50 chars"),

    body("real_name")
      .optional()
      .isLength({ min: 2 })
      .withMessage("Real name must be at least 2 characters long"),

    body("origin_description")
      .notEmpty()
      .withMessage("Origin description is required"),

    body("superpowers")
      .notEmpty()
      .withMessage("Superpowers description is required"),

    body("catch_phrase").notEmpty().withMessage("Catch phrase is required"),
  ];
};

const validate = (req, res, next) => {
  const errors = validationResult(req);
  if (errors.isEmpty()) {
    return next();
  }

  const extractedErrors = [];
  errors.array().map((err) => extractedErrors.push({ [err.path]: err.msg }));

  return res.status(422).json({
    errors: extractedErrors,
  });
};

module.exports = {
  heroValidationRules,
  validate,
};
