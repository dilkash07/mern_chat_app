import React, { useState } from "react";
import OtpInput from "react-otp-input";
import OtpTimer from "../components/otp/OtpTimer";
import { RxCountdownTimer } from "react-icons/rx";
import { BiArrowBack } from "react-icons/bi";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { sendOtp, signup } from "../services/operations/AuthAPI";
import { MdOutlineEmail } from "react-icons/md";

const VerifyEmail = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [otp, setOtp] = useState("");

  const { signupData, loading } = useSelector((state) => state.auth);

  const handleVerifyAndSignup = (event) => {
    event.preventDefault();
    const { firstName, lastName, email, password, confirmPassword } =
      signupData;

    dispatch(
      signup(
        firstName,
        lastName,
        email,
        password,
        confirmPassword,
        otp,
        navigate
      )
    );
  };

  const handleResend = () => {
    dispatch(sendOtp(signupData.email));
  };
  return (
    <div className="h-screen flex justify-center items-center p-5">
      {loading ? (
        <div className="spinner"></div>
      ) : (
        <div className="w-[450px] md:max-w-[450px] md:p-6 md:border md:shadow-lg md:rounded-lg  bg-white">
          {/* Icon and Heading */}
          <div className="mx-auto py-4">
            <MdOutlineEmail size={70} className="mx-auto text-gray-800" />
            <h1 className="text-3xl italic font-serif mt-2 text-center text-gray-800">
              Verify Your Email
            </h1>
          </div>

          <p className="mt-8 mb-12 text-sm italic text-center">
            Enter the 6-digit code we sent to your email{" "}
            <span className="font-medium text-gray-800">
              {signupData.email}
            </span>
            . This code helps us verify your identity and secure your account.
          </p>

          {/* OTP Input */}
          <form
            onSubmit={handleVerifyAndSignup}
            className="flex flex-col gap-y-4"
          >
            <OtpInput
              value={otp}
              onChange={setOtp}
              numInputs={6}
              renderInput={(props) => (
                <input
                  {...props}
                  placeholder="-"
                  style={{
                    boxShadow: "inset 0px -1px 0px rgba(255, 255, 255, 0.18)",
                  }}
                  className="w-[48px] md:w-[60px] border rounded-md aspect-square text-center focus:outline-orange-500"
                />
              )}
              containerStyle={{
                display: "flex",
                justifyContent: "space-between",
                gap: "0 8px",
              }}
            />

            {/* Verify Button */}
            <button
              type="submit"
              className="bg-orange-500 py-3 rounded-lg text-lg font-semibold text-white hover:bg-orange-600 transition-all"
            >
              Verify Email
            </button>
          </form>

          {/* Footer Links */}
          <div className="mt-4 flex items-center justify-between">
            <div className="text-center">
              <Link
                to="/login"
                className="font-medium text-orange-500 hover:text-orange-600 hover:underline"
              >
                <p className="text-sm flex items-center justify-center gap-x-1">
                  <BiArrowBack /> Back to Login
                </p>
              </Link>
            </div>

            <OtpTimer
              initialMinutes={0}
              initialSeconds={30}
              onResend={handleResend}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default VerifyEmail;
