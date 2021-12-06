const ErrorHandler = require("./errorHandler");

class BadRequestError extends ErrorHandler {
  constructor(message) {
    super(message, 400);
  }

  serializeErrors() {
    return [
      {
        message: this.message
      }
    ];
  }
}

module.exports = BadRequestError;
