const express = require("express");
const router = express.Router();

const {
  signup,
  login,
  resetPasswordToken,
  resetPassword,
  sendOtp,
} = require("../controller/Auth");

router.post("/signup", signup);
router.post("/login", login);
router.post("/send-otp", sendOtp);
router.post("/reset-password-token", resetPasswordToken);
router.post("/reset-password/:token", resetPassword);

module.exports = router;
