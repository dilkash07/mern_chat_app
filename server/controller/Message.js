const Message = require("../models/Message");

exports.sendMessage = async (req, res) => {
  try {
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      Message: "Something went wrong while sending message",
    });
  }
};

exports.getMessage = async (req, res) => {
  try {
    const message = await Message.find();
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      Message: "Something went wrong while fetching messages",
    });
  }
};
