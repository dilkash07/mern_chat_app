import React, { createContext, useContext, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import io from "socket.io-client";
import { setOnlineUsers } from "../redux/slice/UserSlice";
import {
  setMessages,
  setNewMessage,
  setTyping,
  removeTyping,
} from "../redux/slice/MessageSlice";
import { playNotification } from "../components/utils/audioPlayer";
import notificationSound from "../assets/notification.mp3";
import { getConversationUsers } from "../services/operations/UserAPI";

const SocketContext = createContext();

export const SocketProvider = ({ children }) => {
  const dispatch = useDispatch();
  const { token } = useSelector((state) => state.auth);
  const { user } = useSelector((state) => state.user);
  const [socket, setSocket] = useState(null);

  useEffect(() => {
    if (user !== null) {
      const socket = io(import.meta.env.VITE_SERVER_URL, {
        query: { userId: user._id },
      });

      setSocket(socket);

      socket.on("onlineUsers", (data) => {
        dispatch(setOnlineUsers(data));
      });

      socket.on("receiveMessage", (data) => {
        playNotification(notificationSound);
        dispatch(getConversationUsers(token));
        if (data.seen) {
          dispatch(setNewMessage(data));
        }
      });

      socket.on("seenMessage", (data) => {
        dispatch(setMessages(data));
      });

      socket.on("isTyping", (data) => {
        if (data.isTyping) {
          dispatch(setTyping(data));
        } else {
          dispatch(removeTyping(data));
        }
      });

      return () => {
        socket.disconnect();
      };
    }
  }, [user]);

  return (
    <SocketContext.Provider value={socket}>{children}</SocketContext.Provider>
  );
};

export const useSocket = () => {
  return useContext(SocketContext);
};
