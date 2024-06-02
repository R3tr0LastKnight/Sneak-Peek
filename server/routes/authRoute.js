const {
  registerController,
  loginController,
  googleLoginController,
  googleregisterController,
} = require("../controller/authController");

const router = require("express").Router();

router.post("/signup", registerController);
router.post("/login", loginController);
router.post("/storeUserData", googleregisterController);
router.post("/googleLogin", googleLoginController);
module.exports = router;
