const Message = require("../models/Message");
const Conversation = require("../models/Conversation");
const User = require("../models/User");
const { io, getReceiverSocket, getCurrentPage } = require("../socket/Socket");
const { uploadFileToCloudinary } = require("../utils/fileUploader");

exports.sendMessage = async (req, res) => {
  try {
    const sender = req.user.id;
    const receiver = req.params.id;
    const { text } = req.body;
    const receiverSocket = getReceiverSocket(receiver);
    const receiverCurrentPage = getCurrentPage(receiver);
    let seen = false;

    if (sender === receiverCurrentPage) {
      seen = true;
    }

    const attachment = req.files && req.files.file ? {} : null;

    if (req.files && req.files.file) {
      const file = req.files.file;

      try {
        const uploadResult = await uploadFileToCloudinary(
          file,
          "MansuriChat/Attachment"
        );

        attachment["url"] = uploadResult.secure_url;
        attachment["public_id"] = uploadResult.public_id;
      } catch (error) {
        console.error("File upload error:", error);
        return res.status(500).json({
          success: false,
          message: "Something went wrong while uploading the file",
        });
      }
    }

    const message = await Message.create({ text, attachment, sender, seen });

    let conversation = await Conversation.findOne({
      members: { $all: [sender, receiver] },
    });

    if (!conversation) {
      const conversation = await Conversation.create({
        members: [sender, receiver],
        messages: [message._id],
        lastMessage: message._id,
        unSeenMessage: seen ? 0 : 1,
      });

      // create users conversations
      await User.findByIdAndUpdate(sender, {
        $push: { conversations: conversation._id },
      });

      await User.findByIdAndUpdate(receiver, {
        $push: { conversations: conversation._id },
      });

      if (receiverSocket) {
        io.to(receiverSocket).emit("receiveMessage", message);
      }
      return res.status(200).json({
        success: true,
        message: "Message send successfully",
        response: message,
      });
    }

    if (!seen) {
      conversation.unSeenMessage = conversation.unSeenMessage + 1;
    }
    conversation.messages.push(message._id);
    conversation.lastMessage = message._id;
    conversation.save();

    if (receiverSocket) {
      io.to(receiverSocket).emit("receiveMessage", message);
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
    const receiverSocket = getReceiverSocket(receiver);

    const conversation = await Conversation.findOne({
      members: { $all: [sender, receiver] },
    })
      .populate("messages")
      .populate("lastMessage");

    const response = await User.findById(receiver);

    // message seen functionality
    if (conversation) {
      for (const message of conversation.messages) {
        if (message.sender.toString() === receiver && !message.seen) {
          message.seen = true;
          await message.save();
        }
      }

      if (conversation.lastMessage.sender.toString() !== sender) {
        conversation.unSeenMessage = 0;
        await conversation.save({ timestamps: false });
      }

      if (receiverSocket) {
        io.to(receiverSocket).emit("seenMessage", conversation.messages);
      }
    }

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
