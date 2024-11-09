const express = require("express");
const router = express.Router();

const { auth } = require("../middleware/Auth");
const {
  getUsers,
  getConversedUsers,
  getSearchUser,
  updateProfilePicture,
  updateName,
  updateAbout,
} = require("../controller/User");

router.get("/get-users", auth, getUsers);
router.get("/get-conversed-users", auth, getConversedUsers);
router.get("/get-search-user", auth, getSearchUser);
router.put("/update-profile-picture", auth, updateProfilePicture);
router.put("/update-name", auth, updateName);
router.put("/update-about", auth, updateAbout);

module.exports = router;
