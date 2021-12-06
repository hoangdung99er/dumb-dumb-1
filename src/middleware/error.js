const ErrorHandler = require("../errors/errorHandler");
module.exports = (error, req, res, next) => {
  if (error instanceof ErrorHandler) {
    return res
      .status(error.statusCode)
      .json({ errors: error.serializeErrors() });
  }

  res.status(400).json({
    errors: [
      {
        message: "Something went wrong"
      }
    ]
  });
};
