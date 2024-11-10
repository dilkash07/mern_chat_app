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
    <div className="h-screen grid place-items-center">
      {loading ? (
        <div className="spinner"></div>
      ) : (
        <div className="max-w-[375px] md:border md:shadow flex flex-col items-center p-5 rounded-md">
          <div className="py-3">
            <MdLockReset size={70} className="mx-auto" />
            <h1 className="text-3xl text-center italic font-serif mt-2">
              Reset your password
            </h1>
          </div>

          <p className="my-4 text-sm italic">
            We’re here to assist you in regaining access to your account. Please
            follow the steps outlined below to reset your password and get back
            to using our services seamlessly
          </p>

          <form
            onSubmit={handleOnSubmit}
            className="w-full flex flex-col gap-y-2"
          >
            <label className="w-full relative">
              <p className="text-[0.875rem] ml-[2px] mb-1 leading-[1.375rem]">
                Enter Password<sup className="text-red-600">*</sup>
              </p>
              <input
                required
                type={showPassword ? "text" : "password"}
                name="password"
                value={formData.password}
                placeholder="Password"
                onChange={changeHandler}
                className="rounded-[8px] w-full pl-3 py-2  border border-b-orange-500 focus:border-b-2 outline-none shadow-sm "
              />
              <span
                className="absolute right-3 top-[36px] cursor-pointer z-10"
                onClick={() => setShowPassword((prev) => !prev)}
              >
                {showPassword ? (
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
                type={showConfirmPassword ? "text" : "password"}
                name="confirmPassword"
                value={formData.confirmPassword}
                placeholder="Confirm Password"
                onChange={changeHandler}
                className="rounded-[8px] w-full pl-3 py-2  border border-b-orange-500 focus:border-b-2 outline-none shadow-sm "
              />
              <span
                className="absolute right-3 top-[36px] cursor-pointer z-10"
                onClick={() => setShowConfirmPassword((prev) => !prev)}
              >
                {showConfirmPassword ? (
                  <AiOutlineEyeInvisible fontSize={24} fill="#656464" />
                ) : (
                  <AiOutlineEye fontSize={24} fill="#656464" />
                )}
              </span>
            </label>

            <button
              type="submit"
              className="bg-orange-500 py-2 px-5 text-lg font-semibold rounded-[8px] mt-6 w-full text-white "
            >
              Submit
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
};

export default ResetPassword;
