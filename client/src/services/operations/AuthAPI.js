import { apiConnector } from "../apiConnector";
import { endPoints } from "../apis";
import toast from "react-hot-toast";
import { setToken } from "../../redux/slice/AuthSlice";
import { setUser } from "../../redux/slice/UserSlice";
import { setLoading } from "../../redux/slice/LoaderSlice";

const { LOGIN_API, SIGNUP_API } = endPoints;

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
      // toast.error(error.response.data.message);
      console.log(error);
      navigate("/login");
    }
    toast.dismiss(toastId);
  };
}

export function signup(formData, navigate) {
  return async (dispatch) => {
    dispatch(setLoading(true));
    try {
      const response = await apiConnector("Post", SIGNUP_API, formData);

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
