import { useState } from "react";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import { BiArrowBack } from "react-icons/bi";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate, useParams } from "react-router-dom";
import { resetPassword } from "../services/operations/AuthAPI";
import { MdLockReset } from "react-icons/md";

const ResetPassword = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { token } = useParams();
  const { loading } = useSelector((state) => state.loader);
  const [formData, setFormData] = useState({
    password: "",
    confirmPassword: "",
  });

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const changeHandler = (e) => {
    setFormData((prevData) => ({
      ...prevData,
      [e.target.name]: e.target.value,
    }));
  };

  const handleOnSubmit = (e) => {
    e.preventDefault();
    dispatch(resetPassword(formData, token, navigate));
  };

  return (
    <div className="flex justify-center items-center h-screen p-5">
      {loading ? (
        <div className="spinner"></div>
      ) : (
        <form
          className="flex flex-col w-[425px] md:max-w-[425px] mx-auto md:p-6 md:border md:shadow-lg md:rounded-lg gap-y-4 text-sm"
          onSubmit={handleOnSubmit}
        >
          {/* Icon and Heading */}
          <div className="mx-auto py-4">
            <MdLockReset size={70} className="mx-auto text-gray-800" />
            <h1 className="text-3xl italic font-serif mt-2 text-center text-gray-800">
              Reset Your Password
            </h1>
          </div>

          {/* Message */}
          <p className="my-4 text-sm italic text-center">
            We’re here to assist you in regaining access to your account. Please
            follow the steps outlined below to reset your password and get back
            to using our services seamlessly.
          </p>

          {/* Password Input */}
          <label className="w-full relative">
            <p className="text-[0.875rem] mb-1">
              Enter Password<sup className="text-red-600">*</sup>
            </p>
            <input
              required
              type={showPassword ? "text" : "password"}
              name="password"
              value={formData.password}
              placeholder="Password"
              onChange={changeHandler}
              className="rounded-[8px] w-full pl-3 py-2 border border-b-orange-500 focus:border-b-2 outline-none shadow-sm"
            />
            <span
              className="absolute right-3 top-[32px] cursor-pointer z-10"
              onClick={() => setShowPassword((prev) => !prev)}
            >
              {showPassword ? (
                <AiOutlineEyeInvisible fontSize={24} fill="#656464" />
              ) : (
                <AiOutlineEye fontSize={24} fill="#656464" />
              )}
            </span>
          </label>

          {/* Confirm Password Input */}
          <label className="w-full relative">
            <p className="text-[0.875rem] mb-1">
              Enter Confirm Password<sup className="text-red-600">*</sup>
            </p>
            <input
              required
              type={showConfirmPassword ? "text" : "password"}
              name="confirmPassword"
              value={formData.confirmPassword}
              placeholder="Confirm Password"
              onChange={changeHandler}
              className="rounded-[8px] w-full pl-3 py-2 border border-b-orange-500 focus:border-b-2 outline-none shadow-sm"
            />
            <span
              className="absolute right-3 top-[32px] cursor-pointer z-10"
              onClick={() => setShowConfirmPassword((prev) => !prev)}
            >
              {showConfirmPassword ? (
                <AiOutlineEyeInvisible fontSize={24} fill="#656464" />
              ) : (
                <AiOutlineEye fontSize={24} fill="#656464" />
              )}
            </span>
          </label>

          {/* Submit Button */}
          <button
            type="submit"
            className="bg-orange-500 py-2 px-5 text-lg font-semibold rounded-[8px] mt-6 w-full text-white hover:bg-orange-600 transition-all"
          >
            Submit
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
};

export default ResetPassword;
