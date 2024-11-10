const express = require("express");
const router = express.Router();

const {
  signup,
  login,
  resetPasswordToken,
  resetPassword,
} = require("../controller/Auth");

router.post("/signup", signup);
router.post("/login", login);
router.post("/reset-password-token", resetPasswordToken);
router.post("/reset-password/:token", resetPassword);

module.exports = router;
