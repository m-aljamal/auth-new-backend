const router = require("express").Router();
const userController = require("../controllers/user-controller");
const {
  userSignupValidator,
  userSigninValidator,
} = require("../validators/user-validator");
const validateRequest = require("../middlewares/validation-request");
const isAuth = require("../middlewares/isAuth");
router.post(
  "/users/signup",
  userSignupValidator,
  validateRequest,
  userController.createUser
);

router.post(
  "/users/signin",
  userSigninValidator,
  validateRequest,
  userController.signinUser
);

router.get("/users/signout", userController.signout);

module.exports = router;
