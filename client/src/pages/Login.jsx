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
    <div>
      <div className="my-5">
        <form
          className="flex flex-col max-w-[375px] mx-auto p-5 rounded-md gap-y-2 text-sm bg-orange-200 "
          onSubmit={submitHandler}
        >
          <div className="mx-auto py-3">
            <VscAccount size={50} className="mx-auto " />
            <h1 className="text-3xl italic font-serif mt-2">Login</h1>
          </div>

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
              className=" rounded-[8px] w-full pl-3 py-2  border-b outline-none shadow-sm shadow-red-400 focus:shadow-red-600"
              autoFocus
            />
          </label>

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
              className=" rounded-[8px] w-full pl-3 py-2  border-b outline-none shadow-sm shadow-red-400 focus:shadow-red-600"
            />
            <span
              className="absolute right-3 top-[33px] cursor-pointer "
              onClick={() => showPassword((prev) => !prev)}
            >
              {password ? (
                <AiOutlineEyeInvisible fontSize={24} fill="#656464" />
              ) : (
                <AiOutlineEye fontSize={24} fill="#656464" />
              )}
            </span>

            <NavLink to={"/forgot-password"}>
              <p className=" text-sm mt-1 max-w-max ml-auto mr-[2px] hover:text-red-600 hover:underline">
                Forgot Password
              </p>
            </NavLink>
          </label>
          <div>
            <button className="bg-orange-600 py-2 px-5 text-lg font-semibold rounded-[8px] mt-6 w-full text-white">
              Sign In
            </button>
          </div>
          <div className=" ml-[2px] mt-1">
            <p>
              Don't have Account ?{" "}
              <Link
                to={"/signup"}
                className=" font-medium text-red-500 hover:text-red-600 hover:underline cursor-pointer"
              >
                Signup
              </Link>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
