import { useState } from "react";
import { BiArrowBack } from "react-icons/bi";
import { VscAccount } from "react-icons/vsc";
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
    <div className="h-screen grid place-items-center">
      {loading ? (
        <div className="spinner"></div>
      ) : (
        <div className="max-w-[375px] md:border md:shadow flex flex-col items-center p-5 rounded-md">
          <div className="py-3">
            <MdLockReset size={70} className="mx-auto" />
            <h1 className="text-3xl text-center italic font-serif mt-2">
              {!emailSent
                ? "Forgot your password"
                : "Your Password Reset Request is On Its Way!"}
            </h1>
          </div>

          <p className="my-4 text-sm italic">
            {!emailSent
              ? "Don’t worry, we’ve got you covered. Enter your email below, and we’ll send you a link to reset your password. If you can’t access your email, please try our account recovery options."
              : `We’ve sent a password reset email to ${email}. Please open the email and click the link to proceed with resetting your password. Didn’t get the email? Check your spam folder, or you can request a new reset link by clicking the button below.`}
          </p>
          <form onSubmit={handleOnSubmit} className="w-full">
            {!emailSent && (
              <label className="w-full">
                <p className="text-[0.875rem] pl-[2px] mb-1 leading-[1.375rem]">
                  Email Address<sup className="text-red-600">*</sup>
                </p>
                <input
                  required
                  type="email"
                  name="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter email address"
                  className="rounded-[8px] w-full pl-3 py-2  border border-b-orange-500 focus:border-b-2 outline-none shadow-sm "
                />
              </label>
            )}
            <button
              type="submit"
              className="bg-orange-500 py-2 px-5 text-lg font-semibold rounded-[8px] mt-6 w-full text-white "
            >
              {!emailSent ? "Send Reset Link" : "Resend Reset Link"}
            </button>
          </form>
          <div className="mt-4 mr-auto hover:text-red-600 hover:underline">
            <Link to="/login">
              <p className="text-sm font-medium flex items-center gap-x-1">
                <BiArrowBack /> Back To Login
              </p>
            </Link>
          </div>
        </div>
      )}
    </div>
  );
}

export default ForgotPassword;
