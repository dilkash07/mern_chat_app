import { apiConnector } from "../apiConnector";
import { messageEndpoints } from "../apis";
import { setLoading } from "../../redux/slice/LoaderSlice";
import {
  setMessages,
  setNewMessage,
  setReceiver,
} from "../../redux/slice/MessageSlice";
import toast from "react-hot-toast";

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

      dispatch(setMessages(response.data.response));
      dispatch(setReceiver(response.data.receiver));
    } catch (error) {
      toast.error(error.response.data.message);
      console.log(error);
    }
    dispatch(setLoading(false));
  };
}

export function sendMessage(text, receiver, token) {
  return async (dispatch) => {
    dispatch(setLoading(true));
    try {
      const response = await apiConnector(
        "Post",
        SEND_MESSAGES_API + receiver,
        { text },
        {
          Authorization: `Bearer ${token}`,
        }
      );

      if (!response.data.success) {
        throw new Error(response.data.message);
      }

      dispatch(setNewMessage(response.data.response));
    } catch (error) {
      toast.error(error.response.data.message);
      console.log(error);
    }
    dispatch(setLoading(false));
  };
}
