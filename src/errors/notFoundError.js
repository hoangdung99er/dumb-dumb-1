const ErrorHandler = require("./errorHandler");

class NotFoundError extends ErrorHandler {
  constructor() {
    super("Route not found", 404);
  }

  serializeErrors() {
    return [
      {
        message: "Not Found"
      }
    ];
  }
}

module.exports = NotFoundError;
