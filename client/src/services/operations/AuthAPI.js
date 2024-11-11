import { apiConnector } from "../apiConnector";
import { endPoints } from "../apis";
import toast from "react-hot-toast";
import { setToken } from "../../redux/slice/AuthSlice";
import { setUser } from "../../redux/slice/UserSlice";
import { setLoading } from "../../redux/slice/LoaderSlice";

const {
  LOGIN_API,
  SIGNUP_API,
  SEND_OTP_API,
  RESET_PASSWORD_TOKEN_API,
  RESET_PASSWORD_API,
} = endPoints;

export function login(formData, navigate) {
  return async (dispatch) => {
    const toastId = toast.loading("Loading");
    try {
      const response = await apiConnector("Post", LOGIN_API, formData);

      if (!response.data.success) {
        throw new Error(response.data.message);
      }

      toast.success(response.data.message);

      dispatch(setToken(response.data.token));
      dispatch(setUser(response.data.user));
      localStorage.setItem("token", JSON.stringify(response.data.token));
      sessionStorage.setItem("user", JSON.stringify(response.data.user));

      navigate("/");
    } catch (error) {
      toast.error(error.response.data.message);
      navigate("/login");
    }
    toast.dismiss(toastId);
  };
}

export function signup(
  firstName,
  lastName,
  email,
  password,
  confirmPassword,
  otp,
  navigate
) {
  return async (dispatch) => {
    dispatch(setLoading(true));
    try {
      const response = await apiConnector("Post", SIGNUP_API, {
        firstName,
        lastName,
        email,
        password,
        confirmPassword,
        otp,
      });

      if (!response.data.success) {
        throw new Error(response.data.message);
      }

      toast.success(response.data.message);
      navigate("/login");
    } catch (error) {
      toast.error(error.response.data.message);
    }
    dispatch(setLoading(false));
  };
}

export function sendOtp(email, navigate) {
  return async (dispatch) => {
    dispatch(setLoading(true));
    try {
      const response = await apiConnector("Post", SEND_OTP_API, { email });

      if (!response.data.success) {
        throw new Error(response.data.message);
      }

      toast.success(response.data.message);
      navigate("/verify-email");
    } catch (error) {
      console.log(error);
      toast.error(error.response.data.message);
    }
    dispatch(setLoading(false));
  };
}

export function logout(navigate) {
  return async (dispatch) => {
    dispatch(setToken(null));
    dispatch(setUser(null));
    localStorage.removeItem("token");
    sessionStorage.removeItem("user");
    toast.success("logged out successfully");
    navigate("/");
  };
}

export function resetPasswordToken(email, setEmailSent) {
  return async (dispatch) => {
    dispatch(setLoading(true));
    try {
      const response = await apiConnector("Post", RESET_PASSWORD_TOKEN_API, {
        email,
      });

      if (!response.data.success) {
        throw new Error(response.data.message);
      }

      toast.success(response.data.message);
      setEmailSent(true);
    } catch (error) {
      toast.error(error.response.data.message);
    }
    dispatch(setLoading(false));
  };
}

export function resetPassword(formData, token, navigate) {
  return async (dispatch) => {
    dispatch(setLoading(true));
    try {
      const response = await apiConnector(
        "Post",
        RESET_PASSWORD_API + token,
        formData
      );

      if (!response.data.success) {
        throw new Error(response.data.message);
      }

      toast.success(response.data.message);
      navigate("/login");
    } catch (error) {
      toast.error(error.response.data.message);
    }
    dispatch(setLoading(false));
  };
}
