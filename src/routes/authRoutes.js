const router = require("./");
const { signup, signin } = require("../controllers/authCtl");
const { body } = require("express-validator");
const { validateRequest } = require("../middleware/validateRequest");
const BadRequestError = require("../errors/badRequestError");
const User = require("../model/user");

router.route("/auth/signup").post(
  [
    body("email")
      .not()
      .isEmpty()
      .withMessage("Email is not empty")
      .isEmail()
      .withMessage("Wrong Email format,must be including @ and domains"),

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
  signup
);

router.route("/auth/signin").post(
  [
    body("email")
      .not()
      .isEmpty()
      .withMessage("Email is not empty")
      .isEmail()
      .withMessage("Wrong Email format,must be including @ and domains"),
    body("password")
      .not()
      .isEmpty()
      .trim()
      .withMessage("Password must not be empty")
  ],
  validateRequest,
  signin
);

module.exports = router;
