import { apiConnector } from "../apiConnector";
import { messageEndpoints } from "../apis";
import { setLoading } from "../../redux/slice/LoaderSlice";
import toast from "react-hot-toast";
import {
  setMessages,
  setNewMessage,
  setReceiver,
} from "../../redux/slice/MessageSlice";
import { setUsers } from "../../redux/slice/UserSlice";

const { GET_MESSAGES_API, SEND_MESSAGES_API } = messageEndpoints;

export function getMessages(receiver, token) {
  return async (dispatch) => {
    dispatch(setLoading(true));
    try {
      const response = await apiConnector(
        "Get",
        GET_MESSAGES_API + receiver,
        null,
        {
          Authorization: `Bearer ${token}`,
        }
      );

      if (!response.data.success) {
        throw new Error(response.data.message);
      }

      dispatch(setUsers(null));
      dispatch(setMessages(response.data.response));
      dispatch(setReceiver(response.data.receiver));
    } catch (error) {
      toast.error(error.response.data.message);
      console.log(error);
    }
    dispatch(setLoading(false));
  };
}

export function sendMessage(formData, receiver, token) {
  return async (dispatch) => {
    dispatch(setLoading(true));
    try {
      const response = await apiConnector(
        "Post",
        SEND_MESSAGES_API + receiver,
        formData,
        {
          Authorization: `Bearer ${token}`,
        }
      );

      if (!response.data.success) {
        throw new Error(response.data.message);
      }

      dispatch(setNewMessage(response.data.response));
      dispatch(setUsers(null));
    } catch (error) {
      toast.error(error.response.data.message);
      console.log(error);
    }
    dispatch(setLoading(false));
  };
}
