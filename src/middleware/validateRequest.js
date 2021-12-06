const { validationResult } = require("express-validator");
const RequestValidationError = require("../errors/requestValidationError");

// handler validate errors of incoming request
const validateRequest = (req, res, next) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    throw new RequestValidationError(errors.array());
  }

  next();
};

exports.validateRequest = validateRequest;
