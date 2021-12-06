const User = require("../model/user");
const { errorValidation } = require("../errors/errorValidationHandler");
const catchAsyncFunction = require("../middleware/catchAsyncError");
const BadRequestError = require("../errors/badRequestError");
const sendToken = require("../utils/sendToken");
const NotAuthorizedError = require("../errors/notAuthorizedError");
const crypto = require("crypto");
const sendEmail = require("../utils/sendEmail");

// Get user info
exports.getUserInfo = catchAsyncFunction(async (req, res, next) => {
  const user = await User.findById(req.user.id);

  res.status(200).json({
    success: true,
    user
  });
});

// Reset Password
exports.forgotPassword = catchAsyncFunction(async (req, res, next) => {
  const { email } = req.body;

  const user = await User.findOne({ email });

  if (!user) {
    return next(new BadRequestError("Email not found"));
  }

  // get generate token to reset password
  const resetToken = user.getResetPasswordToken();

  await user.save();

  const resetPasswordUrl = `https://${req.get(
    "host"
  )}/api/v1/user/password/reset/${resetToken}`;

  const message = `Your reset password token is : \n\n ${resetPasswordUrl}`;

  try {
    await sendEmail({
      email,
      subject: "Assignment",
      message
    });
    
    res.status(200).json({
      success: true,
      message: `Email sent to ${email} successfully`
    });
  } catch (error) {
    // if error was thrown , the token will be reset to undefined
    user.resetPasswordExpired = undefined;
    user.resetPasswordToken = undefined;
    await user.save();
    console.log(error);

    return next(new BadRequestError("Reset password failed, try again later"));
  }
});

// Reset password
exports.resetPassword = catchAsyncFunction(async (req, res, next) => {
  const { password, confirmPassword } = req.body;

  const resetPasswordToken = crypto
    .createHash("sha256")
    .update(req.params.token)
    .digest("hex");

  const user = await User.findOne({
    resetPasswordToken,
    resetPasswordExpired: { $gt: Date.now() }
  });

  if (!user) {
    return next(
      new BadRequestError("Reset password token is invalid or has been expired")
    );
  }

  // after change the password, the token will be expried
  user.password = req.body.password;
  user.resetPasswordToken = undefined;
  user.resetPasswordExpired = undefined;

  await user.save();

  res.status(200).json({
    success: true,
    message: "Password was changed successfully"
  });
});
