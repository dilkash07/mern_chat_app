import { setLoading } from "../../redux/slice/LoaderSlice";
import { setUser, setUsers } from "../../redux/slice/UserSlice";
import { apiConnector } from "../apiConnector";
import { userEndPoints } from "../apis";
import toast from "react-hot-toast";

const { GET_USERS_API, GET_USER_PROFILE_API } = userEndPoints;

export function getUsers(token) {
  return async (dispatch) => {
    dispatch(setLoading(true));
    try {
      const response = await apiConnector("Get", GET_USERS_API, null, {
        Authorization: `Bearer ${token}`,
      });

      if (!response.data.success) {
        throw new Error(response.data.message);
      }

      dispatch(setUsers(response.data.response));
    } catch (error) {
      toast.error(error.response.data.message);
      console.log(error);
    }
    dispatch(setLoading(false));
  };
}

export function getUserProfile(token) {
  return async (dispatch) => {
    dispatch(setLoading(true));
    try {
      const response = await apiConnector("Get", GET_USER_PROFILE_API, null, {
        Authorization: `Bearer ${token}`,
      });

      if (!response.data.success) {
        throw new Error(response.data.message);
      }

      dispatch(setUser(response.data.response));
    } catch (error) {
      toast.error(error.response.data.message);
    }
    dispatch(setLoading(false));
  };
}
