const ErrorHandler = require("./errorHandler");
class NotAuthorizedError extends ErrorHandler {
  constructor(message) {
    super(message, 401);
  }

  serializeErrors() {
    return [
      {
        message: this.message
      }
    ];
  }
}

module.exports = NotAuthorizedError;
