const mongoose = require("mongoose");
const { mailSender } = require("../utils/mailSender");
const otpTemplate = require("../mail/template/emailVerification");

const OtpSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
  },
  otp: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now(),
    expires: 5 * 60,
  },
});

const sendVerificationEmail = async (email, otp) => {
  try {
    const mailResponse = await mailSender(
      email,
      "Verification Email",
      otpTemplate(otp)
    );

    console.log("Email send successfully: ", mailResponse);
  } catch (error) {
    console.log(error);
  }
};

OtpSchema.pre("save", async function (next) {
  if (this.isNew) {
    sendVerificationEmail(this.email, this.otp);
  }
  next();
});

module.exports = mongoose.model("OTP", OtpSchema);
