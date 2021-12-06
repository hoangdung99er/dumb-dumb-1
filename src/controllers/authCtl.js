const User = require("../model/user");
const { errorValidation } = require("../errors/errorValidationHandler");
const catchAsyncFunction = require("../middleware/catchAsyncError");
const BadRequestError = require("../errors/badRequestError");
const sendToken = require("../utils/sendToken");
const NotAuthorizedError = require("../errors/notAuthorizedError")

// Sign in
exports.signup = catchAsyncFunction(async (req, res, next) => {
  const { email, password, confirmPassword } = req.body;

  const existingUser = await User.findOne({ email });

  if (existingUser) {
    return next(new BadRequestError("E-mail already in use"));
  }

  const newUser = await User.create({
    email,
    password,
    confirmPassword
  });

  // Use sendToken service to send user if has a response to.
  sendToken(newUser, 201, res);
});

// Sign up
exports.signin = catchAsyncFunction(async (req, res, next) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });

  if (!user) {
    return next(new BadRequestError("E-mail does not exist"));
  }

  const isPasswordMatch = await user.comparePassword(password);

  if (!isPasswordMatch) {
    return next(new NotAuthorizedError("Invalid password"));
  }

  // Use sendToken service to send user if has a response to.
  sendToken(user, 200, res);
});
