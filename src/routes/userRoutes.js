// const router = require("./index");
const express = require("express");
const { body, param } = require("express-validator");
const { validateRequest } = require("../middleware/validateRequest");
const BadRequestError = require("../errors/badRequestError");
const router = express.Router();
const {
  getUserInfo,
  forgotPassword,
  resetPassword
} = require("../controllers/userCtl");
const { isAuthenticated } = require("../middleware/authMiddleware");

router.route("/user/getuserinfo").get(isAuthenticated, getUserInfo);
router.route("/user/password/forgot").post(
  [
    body("email")
      .not()
      .isEmpty()
      .withMessage("Email is not empty")
      .isEmail()
      .withMessage("Wrong Email format,must be including @ and domains")
  ],
  validateRequest,
  forgotPassword
);
router.route("/user/password/reset/:token").put(
  [
    param("token")
      .isLength(40)
      .withMessage("Invalid token, try again."),
    body("password")
      .not()
      .isEmpty()
      .withMessage("Password must not be empty")
      .matches(/^(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/)
      .withMessage(
        "At least 1 Uppercase, 1 Special Character, 1 Lowercase, including numbers"
      )
      .isLength({ min: 8 })
      .withMessage("At least 8 characters")
      .trim(),
    body("confirmPassword")
      .not()
      .isEmpty()
      .withMessage("Confirm password must be not empty")
      .trim()
      .custom((value, { req }) => {
        if (value !== req.body.password) {
          throw new BadRequestError("Confirm password does not match");
        }
        return true;
      })
  ],
  validateRequest,
  resetPassword
);

module.exports = router;
