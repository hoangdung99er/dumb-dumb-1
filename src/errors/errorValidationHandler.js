const { validationResult } = require("express-validator");
const { RequestValidationError } = require("./requestValidationError");

exports.errorValidation = (req, res, next) => {
  //   const errorFormatter = ({location, msg, param, value, nestedErrors}) => {
  //     return `${location}[${param}] : ${msg}`
  //   }

  //   const result = validationResult(req).formatWith(errorFormatter);
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return next(new RequestValidationError(errors.array()));
  }

  next();
};
