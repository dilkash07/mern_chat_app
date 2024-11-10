import React from "react";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AiOutlineEyeInvisible, AiOutlineEye } from "react-icons/ai";
import { VscAccount } from "react-icons/vsc";
import { useDispatch } from "react-redux";
import { signup } from "../services/operations/AuthAPI";

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

    dispatch(signup(formData, navigate));

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
    <div>
      <div className="my-10">
        <form
          className="flex flex-col max-w-[375px] gap-y-1 mx-auto text-sm bg-orange-200 p-5 rounded-md"
          onSubmit={submitHandler}
        >
          <div className="mx-auto py-3">
            <VscAccount size={50} className="mx-auto " />

            <h1 className="text-3xl italic font-serif mt-2">Signup</h1>
          </div>
          <div className="flex gap-2">
            <label className="w-full">
              <p className="text-[0.875rem] ml-[2px] mb-1 leading-[1.375rem]">
                First Name<sup className="text-red-600">*</sup>
              </p>
              <input
                required
                type="text"
                name="firstName"
                value={formData.firstName}
                placeholder="First Name"
                onChange={changeHandler}
                className=" rounded-[8px] w-full pl-3 py-2 border-b outline-none shadow-sm shadow-red-400 focus:shadow-red-600"
                autoFocus
              />
            </label>
            <label className="w-full">
              <p className="text-[0.875rem] ml-[2px] mb-1 leading-[1.375rem]">
                Last Name<sup className="text-red-600">*</sup>
              </p>
              <input
                required
                type="text"
                name="lastName"
                value={formData.lastName}
                placeholder="Last Name"
                onChange={changeHandler}
                className=" rounded-[8px] w-full pl-3 py-2 border-b outline-none shadow-sm shadow-red-400 focus:shadow-red-600"
                autoFocus
              />
            </label>
          </div>

          <label className="w-full">
            <p className="text-[0.875rem] ml-[2px] mb-1 leading-[1.375rem]">
              Email Address<sup className="text-red-600">*</sup>
            </p>
            <input
              required
              type="email"
              name="email"
              value={formData.email}
              placeholder="Email address"
              onChange={changeHandler}
              className=" rounded-[8px] w-full pl-3 py-2  border-b outline-none shadow-sm shadow-red-400 focus:shadow-red-600"
            />
          </label>

          <label className="w-full relative">
            <p className="text-[0.875rem] ml-[2px] mb-1 leading-[1.375rem]">
              Enter Password<sup className="text-red-600">*</sup>
            </p>
            <input
              required
              type={password ? "text" : "password"}
              name="password"
              value={formData.password}
              placeholder="Password"
              onChange={changeHandler}
              className=" rounded-[8px] w-full pl-3 py-2  border-b outline-none shadow-sm shadow-red-400 focus:shadow-red-600"
            />
            <span
              className="absolute right-3 top-[33px] cursor-pointer z-10"
              onClick={() => showPassword((prev) => !prev)}
            >
              {password ? (
                <AiOutlineEyeInvisible fontSize={24} fill="#656464" />
              ) : (
                <AiOutlineEye fontSize={24} fill="#656464" />
              )}
            </span>
          </label>

          <label className="w-full relative">
            <p className="text-[0.875rem] ml-[2px] mb-1 leading-[1.375rem]">
              Enter Confirm Password<sup className="text-red-600">*</sup>
            </p>
            <input
              required
              type={confirmPassword ? "text" : "password"}
              name="confirmPassword"
              value={formData.confirmPassword}
              placeholder="Confirm Password"
              onChange={changeHandler}
              className=" rounded-[8px] w-full pl-3 py-2  border-b outline-none shadow-sm shadow-red-400 focus:shadow-red-600"
            />
            <span
              className="absolute right-3 top-[33px] cursor-pointer z-10"
              onClick={() => showConfirmPassword((prev) => !prev)}
            >
              {confirmPassword ? (
                <AiOutlineEyeInvisible fontSize={24} fill="#656464" />
              ) : (
                <AiOutlineEye fontSize={24} fill="#656464" />
              )}
            </span>
          </label>

          <div>
            <button className="bg-orange-600 py-2 px-5 text-lg font-semibold rounded-[8px] mt-6 w-full text-white">
              Create Account
            </button>
          </div>

          <div className=" ml-[2px] mt-1">
            <p>
              Already have Account ?{" "}
              <Link
                to={"/login"}
                className=" font-medium text-red-500 hover:text-red-600 hover:underline cursor-pointer"
              >
                Login
              </Link>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Signup;
