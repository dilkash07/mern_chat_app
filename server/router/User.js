const express = require("express");
const router = express.Router();

const { auth } = require("../middleware/Auth");
const {
  getUserDetails,
  getUsers,
  getUserProfile,
} = require("../controller/User");

router.get("/get-users", auth, getUsers);
router.get("/get-user-profile", auth, getUserProfile);
router.get("/user-details", auth, getUserDetails);

module.exports = router;
