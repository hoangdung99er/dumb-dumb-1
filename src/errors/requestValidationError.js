const ErrorHandler = require("./errorHandler");
// const { ValidationError } = require("express-validator");

class RequestValidationError extends ErrorHandler {
  constructor(errors) {
    super("Invalid request parameters", 400);
    this.errors = errors;
  }

  serializeErrors() {
    return this.errors.map(err => {
      return {
        message: err.msg,
        field : err.param
      };
    });
  }
}

module.exports = RequestValidationError;
