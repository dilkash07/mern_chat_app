const User = require("../models/User");
const {
  uploadFileToCloudinary,
  removeFileFromCloudinary,
} = require("../utils/fileUploader");

exports.getUsers = async (req, res) => {
  try {
    const response = await User.find({ _id: { $ne: req.user.id } }).sort({
      createdAt: -1,
    });

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

exports.getConversedUsers = async (req, res) => {
  try {
    const { id } = req.user;

    const user = await User.findById(id)
      .populate({
        path: "conversations",
        select: "-messages",
        populate: [
          {
            path: "members",
            match: { _id: { $ne: id } },
          },
          { path: "lastMessage" },
        ],
      })
      .exec();

    user.password = undefined;

    if (user && user.conversations) {
      user.conversations.sort(
        (a, b) => new Date(b.updatedAt) - new Date(a.updatedAt)
      );
    }

    res.status(200).json({
      success: true,
      message: "Coversations fetched successfully",
      response: user,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "Something went wrong while fetching conversation user",
    });
  }
};

exports.getSearchUser = async (req, res) => {
  try {
    const { query } = req.query;

    if (!query) {
      return res.status(401).json({
        success: false,
        message: "Serach query is required",
      });
    }

    const response = await User.find({
      $or: [
        { firstName: { $regex: query, $options: "i" } },
        { lastName: { $regex: query, $options: "i" } },
        { email: { $regex: query, $options: "i" } },
      ],
    });

    res.status(200).json({
      success: true,
      message: "User fetched successfully",
      response,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Something went wrong while searching user",
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
      await removeFileFromCloudinary(user.profilePic.public_id);
      profilePic = await uploadFileToCloudinary(imageFile, "MansuriChat/User");
    } else {
      profilePic = await uploadFileToCloudinary(imageFile, "MansuriChat/User");
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
