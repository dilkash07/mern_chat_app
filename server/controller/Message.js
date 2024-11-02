const Message = require("../models/Message");
const Conversation = require("../models/Conversation");
const User = require("../models/User");
const { io, getReceiverSocket } = require("../socket/Socket");

exports.sendMessage = async (req, res) => {
  try {
    const sender = req.user.id;
    const receiver = req.params.id;
    const { text } = req.body;
    const receiverSocket = getReceiverSocket(receiver);

    let conversation = await Conversation.findOne({
      members: { $all: [sender, receiver] },
    });

    const message = await Message.create({ text, sender });

    if (!conversation) {
      await Conversation.create({
        members: [sender, receiver],
        messages: [message._id],
      });

      if (receiverSocket) {
        io.to(receiverSocket).emit("receive_message", message);
      }

      return res.status(200).json({
        success: true,
        message: "Message send successfully",
        response: message,
      });
    }

    conversation.messages.push(message._id);
    conversation.save();

    if (receiverSocket) {
      io.to(receiverSocket).emit("receive_message", message);
    }

    res.status(200).json({
      success: true,
      message: "Message send successfully",
      response: message,
    });
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
    const sender = req.user.id;
    const receiver = req.params.id;

    const conversation = await Conversation.findOne({
      members: { $all: [sender, receiver] },
    })
      .populate("messages")
      .populate("members")
      .exec();

    const response = await User.findById(receiver);

    res.status(200).json({
      success: true,
      message: "Message fetched successfully",
      response: conversation?.messages,
      receiver: response,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      Message: "Something went wrong while fetching messages",
    });
  }
};
