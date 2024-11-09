import { setLoading } from "../../redux/slice/LoaderSlice";
import {
  setConversationUsers,
  setUser,
  setUsers,
} from "../../redux/slice/UserSlice";
import { apiConnector } from "../apiConnector";
import { userEndPoints } from "../apis";
import toast from "react-hot-toast";
import { logout } from "./AuthAPI";

const {
  GET_USERS_API,
  GET_SEARCH_USER_API,
  GET_CONVERSED_USERS_API,
  UPDATE_PROFILE_PICTURE_API,
  UPDATE_NAME_API,
  UPDATE_ABOUT_API,
} = userEndPoints;

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

export function getSearchUser(query, token) {
  return async (dispatch) => {
    dispatch(setLoading(true));
    try {
      const response = await apiConnector(
        "Get",
        GET_SEARCH_USER_API,
        null,
        {
          Authorization: `Bearer ${token}`,
        },
        { query }
      );

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

export function getConversationUsers(token, navigate) {
  return async (dispatch) => {
    dispatch(setLoading(true));
    try {
      const response = await apiConnector(
        "Get",
        GET_CONVERSED_USERS_API,
        null,
        {
          Authorization: `Bearer ${token}`,
        }
      );

      if (!response.data.success) {
        throw new Error(response.data.message);
      }

      dispatch(setUser(response.data.response));
      dispatch(setConversationUsers(response.data.response));
    } catch (error) {
      dispatch(logout(navigate));
      toast.error(error.response.data.message);
    }
    dispatch(setLoading(false));
  };
}

export function updateProfilePicture(formData, token) {
  return async (dispatch) => {
    dispatch(setLoading(true));
    try {
      const response = await apiConnector(
        "Put",
        UPDATE_PROFILE_PICTURE_API,
        formData,
        {
          Authorization: `Bearer ${token}`,
        }
      );

      if (!response.data.success) {
        throw new Error(response.data.message);
      }

      toast.success(response.data.message);
      dispatch(setUser(response.data.response));
    } catch (error) {
      toast.error(error.response.data.message);
    }
    dispatch(setLoading(false));
  };
}

export function updateName(name, token) {
  return async (dispatch) => {
    dispatch(setLoading(true));
    try {
      const response = await apiConnector(
        "Put",
        UPDATE_NAME_API,
        { name },
        {
          Authorization: `Bearer ${token}`,
        }
      );

      if (!response.data.success) {
        throw new Error(response.data.message);
      }

      toast.success(response.data.message);
      dispatch(setUser(response.data.response));
    } catch (error) {
      toast.error(error.response.data.message);
    }
    dispatch(setLoading(false));
  };
}

export function updateAbout(about, token) {
  return async (dispatch) => {
    dispatch(setLoading(true));
    try {
      const response = await apiConnector(
        "Put",
        UPDATE_ABOUT_API,
        { about },
        {
          Authorization: `Bearer ${token}`,
        }
      );

      if (!response.data.success) {
        throw new Error(response.data.message);
      }

      toast.success(response.data.message);
      dispatch(setUser(response.data.response));
    } catch (error) {
      toast.error(error.response.data.message);
    }
    dispatch(setLoading(false));
  };
}
