import { useState } from "react";
import { BiArrowBack } from "react-icons/bi";
import { MdLockReset } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { resetPasswordToken } from "../services/operations/AuthAPI";

function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [emailSent, setEmailSent] = useState(false);
  const dispatch = useDispatch();
  const { loading } = useSelector((state) => state.auth);

  const handleOnSubmit = (e) => {
    e.preventDefault();
    dispatch(resetPasswordToken(email, setEmailSent));
  };

  return (
    <div className="flex justify-center items-center h-screen p-5">
      {loading ? (
        <div className="spinner"></div>
      ) : (
        <form
          className="flex flex-col w-[425px] md:max-w-[425px] mx-auto p-6 border rounded-lg gap-y-4 text-sm bg-white shadow-lg"
          onSubmit={handleOnSubmit}
        >
          {/* Icon and Heading */}
          <div className="mx-auto py-4">
            <MdLockReset size={70} className="mx-auto text-gray-800" />
            <h1 className="text-3xl italic font-serif mt-2 text-center text-gray-800">
              {!emailSent
                ? "Forgot Your Password?"
                : "Password Reset Link Sent!"}
            </h1>
          </div>

          {/* Message */}
          <p className="my-4 text-sm italic text-center">
            {!emailSent
              ? "Don’t worry, we’ve got you covered. Enter your email below, and we’ll send you a link to reset your password. If you can’t access your email, please try our account recovery options."
              : `We’ve sent a password reset email to ${email}. Please check your inbox and click the link to reset your password. Didn’t receive the email? Check your spam folder or click the button below to resend the link.`}
          </p>

          {/* Email Input */}
          {!emailSent && (
            <label className="w-full">
              <p className="text-[0.875rem] mb-1">
                Email Address<sup className="text-red-600">*</sup>
              </p>
              <input
                required
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email address"
                className="rounded-[8px] w-full pl-3 py-2 border border-b-orange-500 focus:border-b-2 outline-none shadow-sm"
              />
            </label>
          )}

          {/* Submit Button */}
          <button
            type="submit"
            className="bg-orange-500 py-2 px-5 text-lg font-semibold rounded-[8px] mt-6 w-full text-white hover:bg-orange-600 transition-all"
          >
            {!emailSent ? "Send Reset Link" : "Resend Reset Link"}
          </button>

          {/* Back to Login Link */}
          <div className="text-center mt-4">
            <Link
              to="/login"
              className="font-medium text-orange-500 hover:text-orange-600 hover:underline"
            >
              <p className="text-sm flex items-center justify-center gap-x-1">
                <BiArrowBack /> Back to Login
              </p>
            </Link>
          </div>
        </form>
      )}
    </div>
  );
}

export default ForgotPassword;
