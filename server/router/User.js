const express = require("express");
const router = express.Router();

const { auth } = require("../middleware/Auth");
const {
  getUsers,
  getConversationUsers,
  getUserProfile,
  updateProfilePicture,
  updateName,
  updateAbout,
} = require("../controller/User");

router.get("/get-users", auth, getUsers);
router.get("/get-conversation-users", auth, getConversationUsers);
router.get("/get-user-profile", auth, getUserProfile);
router.put("/update-profile-picture", auth, updateProfilePicture);
router.put("/update-name", auth, updateName);
router.put("/update-about", auth, updateAbout);

module.exports = router;
