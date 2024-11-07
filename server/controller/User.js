const User = require("../models/User");
const {
  removeImageFromCloudinary,
  uploadImageToCloudinary,
} = require("../utils/fileUploader");

exports.getUsers = async (req, res) => {
  try {
    const response = await User.find({ _id: { $ne: req.user.id } });

    res.status(200).json({
      success: true,
      message: "Users fetched successfully",
      response,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "Something went wrong while fetching users",
    });
  }
};

exports.getConversationUsers = async (req, res) => {
  try {
    const { id } = req.user;

    const users = await User.findById(id)
      .populate({
        path: "conversations",
        select: "-messages",
        populate: [
          {
            path: "members",
            match: { _id: { $ne: id } },
            select: "firstName lastName",
          },
          { path: "lastMessage", select: "text createdAt" },
        ],
      })
      .sort({ "conversations.updatedAt": -1 })
      .exec();

    res.status(200).json({
      success: true,
      message: "Coversations fetched successfully",
      response: users,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "Something went wrong while fetching conversation user",
    });
  }
};

exports.getUserProfile = async (req, res) => {
  try {
    const response = await User.findById(req.user.id);

    res.status(200).json({
      success: true,
      message: "User profie fetched successfully",
      response,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "Something went wrong while fetching user profile",
    });
  }
};

exports.updateProfilePicture = async (req, res) => {
  try {
    const { id } = req.user;
    const { imageFile } = req.files;

    const user = await User.findById(id);

    let profilePic;
    if (user.profilePic.public_id) {
      await removeImageFromCloudinary(user.profilePic.public_id);
      profilePic = await uploadImageToCloudinary(imageFile, "MansuriChat/User");
    } else {
      profilePic = await uploadImageToCloudinary(imageFile, "MansuriChat/User");
    }

    user.profilePic.image_url = profilePic.secure_url;
    user.profilePic.public_id = profilePic.public_id;
    await user.save();

    res.status(200).json({
      success: true,
      message: "Profile picture updated successfully",
      response: user,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "Something went wrong while updating Profile Picture",
    });
  }
};

exports.updateName = async (req, res) => {
  try {
    const { id } = req.user;
    const { name } = req.body;
    const [firstName, lastName] = name.split(" ");

    const user = await User.findById(id);

    user.firstName = firstName;
    user.lastName = lastName ? lastName : "";
    if (!user.profilePic.public_id) {
      const image_url = `https://api.dicebear.com/5.x/initials/svg?seed=${firstName} ${
        lastName ? lastName : ""
      }`;
      user.profilePic.image_url = image_url;
    }
    await user.save();

    res.status(200).json({
      success: true,
      message: "Name updated successfully",
      response: user,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "Something went wrong while updating name",
    });
  }
};

exports.updateAbout = async (req, res) => {
  try {
    const { id } = req.user;
    const { about } = req.body;

    const response = await User.findByIdAndUpdate(id, { about }, { new: true });

    res.status(200).json({
      success: true,
      message: "About updated successfully",
      response,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "Something went wrong while updating about",
    });
  }
};
