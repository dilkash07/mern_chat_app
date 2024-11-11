import React from "react";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AiOutlineEyeInvisible, AiOutlineEye } from "react-icons/ai";
import { VscAccount } from "react-icons/vsc";
import { useDispatch } from "react-redux";
import { sendOtp } from "../services/operations/AuthAPI";
import { setSignupData } from "../redux/slice/AuthSlice";

const Signup = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [password, showPassword] = useState(false);
  const [confirmPassword, showConfirmPassword] = useState(false);

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  function changeHandler(event) {
    setFormData((prev) => ({
      ...prev,
      [event.target.name]: event.target.value,
    }));
  }

  async function submitHandler(event) {
    event.preventDefault();

    dispatch(setSignupData(formData));
    dispatch(sendOtp(formData.email, navigate));

    // reset form data
    setFormData({
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      confirmPassword: "",
    });
  }

  return (
    <div className="flex justify-center items-center h-screen p-5">
      <form
        className="flex flex-col w-[425px] md:max-w-[425px] mx-auto p-6 border rounded-lg gap-y-4 text-sm bg-white shadow-lg"
        onSubmit={submitHandler}
      >
        {/* Icon and Heading */}
        <div className="mx-auto py-4">
          <VscAccount size={50} className="mx-auto text-gray-800" />
          <h1 className="text-3xl italic font-serif mt-2 text-center text-gray-800">
            Signup
          </h1>
        </div>

        {/* First Name Input */}
        <div className="flex gap-2">
          <label className="w-full">
            <p className="text-[0.875rem] mb-1">
              First Name<sup className="text-red-600">*</sup>
            </p>
            <input
              required
              type="text"
              name="firstName"
              value={formData.firstName}
              placeholder="First Name"
              onChange={changeHandler}
              className="rounded-[8px] w-full pl-3 py-2 border border-b-orange-500 focus:border-b-2 outline-none shadow-sm"
            />
          </label>

          {/* Last Name Input */}
          <label className="w-full">
            <p className="text-[0.875rem] mb-1">
              Last Name<sup className="text-red-600">*</sup>
            </p>
            <input
              required
              type="text"
              name="lastName"
              value={formData.lastName}
              placeholder="Last Name"
              onChange={changeHandler}
              className="rounded-[8px] w-full pl-3 py-2 border border-b-orange-500 focus:border-b-2 outline-none shadow-sm"
            />
          </label>
        </div>

        {/* Email Input */}
        <label className="w-full">
          <p className="text-[0.875rem] mb-1">
            Email Address<sup className="text-red-600">*</sup>
          </p>
          <input
            required
            type="email"
            name="email"
            value={formData.email}
            placeholder="Email Address"
            onChange={changeHandler}
            className="rounded-[8px] w-full pl-3 py-2 border border-b-orange-500 focus:border-b-2 outline-none shadow-sm"
          />
        </label>

        {/* Password Input */}
        <label className="w-full relative">
          <p className="text-[0.875rem] mb-1">
            Enter Password<sup className="text-red-600">*</sup>
          </p>
          <input
            required
            type={password ? "text" : "password"}
            name="password"
            value={formData.password}
            placeholder="Password"
            onChange={changeHandler}
            className="rounded-[8px] w-full pl-3 py-2 border border-b-orange-500 focus:border-b-2 outline-none shadow-sm"
          />
          <span
            className="absolute right-3 top-[33px] cursor-pointer"
            onClick={() => showPassword((prev) => !prev)}
          >
            {password ? (
              <AiOutlineEyeInvisible fontSize={24} fill="#656464" />
            ) : (
              <AiOutlineEye fontSize={24} fill="#656464" />
            )}
          </span>
        </label>

        {/* Confirm Password Input */}
        <label className="w-full relative">
          <p className="text-[0.875rem] mb-1">
            Confirm Password<sup className="text-red-600">*</sup>
          </p>
          <input
            required
            type={confirmPassword ? "text" : "password"}
            name="confirmPassword"
            value={formData.confirmPassword}
            placeholder="Confirm Password"
            onChange={changeHandler}
            className="rounded-[8px] w-full pl-3 py-2 border border-b-orange-500 focus:border-b-2 outline-none shadow-sm"
          />
          <span
            className="absolute right-3 top-[33px] cursor-pointer"
            onClick={() => showConfirmPassword((prev) => !prev)}
          >
            {confirmPassword ? (
              <AiOutlineEyeInvisible fontSize={24} fill="#656464" />
            ) : (
              <AiOutlineEye fontSize={24} fill="#656464" />
            )}
          </span>
        </label>

        {/* Create Account Button */}
        <button className="bg-orange-500 py-2 px-5 text-lg font-semibold rounded-[8px] mt-6 w-full text-white hover:bg-orange-600 transition-all">
          Create Account
        </button>

        {/* Login Link */}
        <div className="text-center mt-2">
          <p>
            Already have an account?{" "}
            <Link
              to={"/login"}
              className="font-medium text-orange-500 hover:text-orange-600 hover:underline"
            >
              Login
            </Link>
          </p>
        </div>
      </form>
    </div>
  );
};

export default Signup;
