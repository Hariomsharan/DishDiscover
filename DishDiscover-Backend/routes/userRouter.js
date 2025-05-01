var express = require("express");
var router = express.Router();
const { check } = require("express-validator");
const { isLoggedIn } = require("./utility/verifyToken");
const {
  homepageRoute,
  signupRoute,
  signinRoute,
  editProfileRoute,
  resetPasswordRoute,
  forgetpasswordRoute,
} = require("../controller/userControllers");

/**
 * @route POST /users
 * @desc Testing Home Route
 * @access private
 */
router.get("/", isLoggedIn, homepageRoute);

/**
 * @route POST /users/signup
 * @desc let the user register on DishDiscover
 * @access public
 */
router.post(
  "/signup",
  [
    check(
      "username",
      "Username must have atleast four characters, space not allowed"
    )
      .isLength({ min: 4 })
      .matches(/^[\S]+$/),
    check("email", "Invalid email address").isEmail(),
    check("password", "Password must have atleast 6 characters").isLength({
      min: 6,
    }),
  ],
  signupRoute
);

/**
 * @route POST /users/signin
 * @desc let the user signin on DishDiscover
 * @access public
 */
router.post("/signin", signinRoute);

/**
 * @route POST /users/editProfile
 * @desc let the user editProfile on DishDiscover
 * @access private
 */
router.post("/editProfile", isLoggedIn, editProfileRoute);

/**
 * @route POST /users/resetpassword
 * @desc let the user reset it's password on DishDiscover
 * @access private
 */
router.post(
  "/resetpassword",
  [
    check("newpassword", "Password must have atleast 6 characters").isLength({
      min: 6,
    }),
  ],
  isLoggedIn,
  resetPasswordRoute
);

/**
 * @route POST /users/forgetpassword
 * @desc let the user change the password with email
 * @access Public
 */
router.post(
  "/forgetpassword",
  [check("email", "Enter valid email address").isEmail()],
  forgetpasswordRoute
);



module.exports = router;
