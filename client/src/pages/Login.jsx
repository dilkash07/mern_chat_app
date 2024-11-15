import React, { useState } from "react";
import { NavLink, Link, useNavigate } from "react-router-dom";
import { AiOutlineEyeInvisible, AiOutlineEye } from "react-icons/ai";
import { VscAccount } from "react-icons/vsc";
import { useDispatch } from "react-redux";
import { login } from "../services/operations/AuthAPI";

const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [password, showPassword] = useState(false);

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  function changeHandler(event) {
    setFormData((prev) => ({
      ...prev,
      [event.target.name]: event.target.value,
    }));
  }

  function submitHandler(event) {
    event.preventDefault();

    dispatch(login(formData, navigate));

    setFormData({
      email: "",
      password: "",
    });
  }

  return (
    <div className="flex justify-center items-center h-screen p-5">
      <form
        className="flex flex-col w-[425px] md:max-w-[425px] mx-auto md:p-6 md:border md:shadow-lg md:rounded-lg gap-y-4 text-sm"
        onSubmit={submitHandler}
      >
        {/* Icon and Heading */}
        <div className="mx-auto py-4">
          <VscAccount size={50} className="mx-auto text-gray-800" />
          <h1 className="text-3xl italic font-serif mt-2 text-center text-gray-800">
            Login
          </h1>
        </div>

        {/* Email Input */}
        <label className="w-full">
          <p className="text-[0.875rem] pl-[2px] mb-1 leading-[1.375rem]">
            Email Address<sup className="text-red-600">*</sup>
          </p>
          <input
            required
            type="email"
            name="email"
            value={formData.email}
            placeholder="Enter your email address"
            onChange={changeHandler}
            className="rounded-[8px] w-full pl-3 py-2  border border-b-orange-500 focus:border-b-2 outline-none shadow-sm"
            autoFocus
          />
        </label>

        {/* Password Input */}
        <label className="w-full relative">
          <p className="text-[0.875rem] pl-[2px] mb-1 leading-[1.375rem]">
            Password<sup className="text-red-600">*</sup>
          </p>
          <input
            required
            type={password ? "text" : "password"}
            name="password"
            value={formData.password}
            placeholder="Enter your password"
            onChange={changeHandler}
            className="rounded-[8px] w-full pl-3 py-2  border border-b-orange-500 focus:border-b-2 outline-none shadow-sm"
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
          <NavLink to={"/forgot-password"}>
            <p className="text-sm mt-1 max-w-max ml-auto hover:text-orange-500 hover:underline">
              Forgot Password
            </p>
          </NavLink>
        </label>

        {/* Sign In Button */}
        <button className="bg-orange-500 py-2 px-5 text-lg font-semibold rounded-[8px] mt-6 w-full text-white hover:bg-orange-600 transition-all">
          Sign In
        </button>

        {/* Signup Link */}
        <div className="text-center mt-2">
          <p>
            Don't have an account?{" "}
            <Link
              to={"/signup"}
              className="font-medium text-orange-500 hover:text-orange-600 hover:underline"
            >
              Signup
            </Link>
          </p>
        </div>
      </form>
    </div>
  );
};

export default Login;
