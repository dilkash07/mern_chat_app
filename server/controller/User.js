const User = require("../models/User");

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

exports.getUserDetails = async (req, res) => {
  try {
    const response = await User.findById(req.user.id);

    res.status(200).json({
      success: true,
      message: "User details fetched successfully",
      response,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "Something went wrong while fetching user details",
    });
  }
};
