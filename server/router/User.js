const express = require("express");
const router = express.Router();

const { auth } = require("../middleware/Auth");
const { getUserDetails } = require("../controller/User");

router.get("/user-details", auth, getUserDetails);

module.exports = router;
