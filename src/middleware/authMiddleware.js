const catchAsyncFunction = require("./catchAsyncError");
const NotAuthorizedError = require("../errors/notAuthorizedError");
const jwt = require("jsonwebtoken");
const User = require("../model/user");

exports.isAuthenticated = catchAsyncFunction(async (req, res, next) => {
  const { token } = req.cookies;

  if (!token) {
    return next(new NotAuthorizedError("Login required"));
  }

  const decodedData = jwt.verify(token, process.env.JWT_SECRET);

  try {
    req.user = await User.findById(decodedData.id);
  } catch (err) {
    next(new NotAuthorizedError("Failed to load token"));
  }

  next();
});
