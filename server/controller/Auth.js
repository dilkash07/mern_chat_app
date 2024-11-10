const User = require("../models/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const crypto = require("crypto");
const { mailSender } = require("../utils/mailSender");
require("dotenv").config();

exports.signup = async (req, res) => {
  try {
    const { firstName, lastName, email, password, confirmPassword } = req.body;

    if (!firstName || !lastName || !email || !password || !confirmPassword) {
      return res.status(400).json({
        success: false,
        message: "please fill all the details",
      });
    }

    if (password !== confirmPassword) {
      return res.status(401).json({
        success: false,
        message: "Password and Confirm Password not match",
      });
    }

    const user = await User.findOne({ email });

    if (user) {
      return res.status(401).json({
        success: false,
        message: "User already exist please login",
      });
    }

    const response = await User.create({
      firstName,
      lastName,
      email,
      password,
      profilePic: {
        image_url: `https://api.dicebear.com/5.x/initials/svg?seed=${firstName} ${lastName}`,
      },
    });

    res.status(200).json({
      success: true,
      message: "User created successfully",
      response,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "Something went wrong while creating user",
      error,
    });
  }
};

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(401).json({
        success: false,
        message: "Please fill all the details",
      });
    }

    const user = await User.findOne({ email });

    if (!user) {
      return res.status(401).json({
        success: false,
        message: "User is not registered please signup",
      });
    }

    if (await bcrypt.compare(password, user.password)) {
      const payload = {
        emai: user.email,
        id: user._id,
      };

      const token = await jwt.sign(payload, process.env.JWT_SECRET, {
        expiresIn: process.env.TOKEN_EXPIRY,
      });

      user.token = token;
      user.password = undefined;

      const options = {
        expires: new Date(Date.now() + 24 * 60 * 60 * 1000),
        httpOnly: true,
      };

      res.cookie("token", token, options).status(200).json({
        success: true,
        message: "User loged in successfully",
        user,
        token,
      });
    } else {
      res.status(401).json({
        success: false,
        message: "user or password not valid",
      });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "Something went wrong while logged in",
    });
  }
};

exports.resetPasswordToken = async (req, res) => {
  try {
    const { email } = req.body;

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({
        success: false,
        message: "User is not registered please provide valid email",
      });
    }

    const resetToken = crypto.randomBytes(32).toString("hex");
    user.resetPasswordToken = crypto
      .createHash("sha256")
      .update(resetToken)
      .digest("hex");
    user.resetPasswordExpires = Date.now() + 5 * 60 * 1000;
    await user.save();

    const resetUrl = `${process.env.CLIENT_URL}/reset-password/${resetToken}`;

    await mailSender(
      email,
      "Password Reset Request",
      `<p>Hi ${user.firstName},</p>
        <p>We know it can be frustrating to lose access to your account. Don't worry, we're here to help!</p>
        <p>Here's how to reset your password:</p>
        <ul>
          <li>Click this link: <a href="${resetUrl}">Reset Password</a></li>
          <li>Follow the on-screen instructions.</li>
        </ul>
        <p>If you encounter any issues or have questions, please reach out to our support team at caremansurimart@gmail.com.</p>
        <p>We'll do our best to get you back into your account quickly.</p>`
    );

    res.status(200).json({
      success: true,
      message: "Reset link set to your email successfully",
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "Something went wrong while reset forgot password",
    });
  }
};

exports.resetPassword = async (req, res) => {
  try {
    const { token } = req.params;
    const { password, confirmPassword } = req.body;

    if (password !== confirmPassword) {
      return res.status(401).json({
        success: false,
        message: "Password and confirm password does not match",
      });
    }

    const hashedToken = crypto.createHash("sha256").update(token).digest("hex");
    const user = await User.findOne({ resetPasswordToken: hashedToken });

    if (!user) {
      return res.status(401).json({
        success: false,
        message: "Token is invalid",
      });
    }

    if (user.resetPasswordExpires < Date.now()) {
      return res.status(401).json({
        success: false,
        message: "Token is expired please, regenrate your token",
      });
    }

    user.password = password;
    user.resetPasswordToken = undefined;
    user.resetPasswordExpires = undefined;
    user.save();

    res.status(200).json({
      success: true,
      message: "Password reset successfully",
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "Something went wrong while resetting password",
    });
  }
};
