const express = require("express");
const router = express.Router();

const { auth } = require("../middleware/Auth");
const { sendMessage, getMessage } = require("../controller/Message");

router.post("/send-message/:id", auth, sendMessage);
router.get("/get-message/:id", auth, getMessage);

module.exports = router;
