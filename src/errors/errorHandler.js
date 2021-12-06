class ErrorHandler extends Error {
  constructor(message, code) {
    super(message);
    this.statusCode = code;
  }

  serializeErrors() {
    return [{ message: this.message }];
  }
}

module.exports = ErrorHandler;
