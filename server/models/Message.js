const mongoose = require("mongoose");

const messageSchema = new mongoose.Schema(
  {
    text: String,
    image_url: String,
    video_url: String,
    seen: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Message", messageSchema);
