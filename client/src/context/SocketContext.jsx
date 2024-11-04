import React, { createContext, useContext, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import io from "socket.io-client";
import { setOnlineUsers } from "../redux/slice/UserSlice";
import {
  setMessages,
  setNewMessage,
  setTyping,
} from "../redux/slice/MessageSlice";
import { playNotification } from "../components/utils/audioPlayer";
import notificationSound from "../assets/notification.mp3";
import { useParams } from "react-router-dom";

const SocketContext = createContext();

export const SocketProvider = ({ children }) => {
  const dispatch = useDispatch();
  const [socket, setSocket] = useState(null);
  const { user } = useSelector((state) => state.user);

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
        if (data.seen) {
          dispatch(setNewMessage(data));
        }
      });

      socket.on("seenMessage", (data) => {
        dispatch(setMessages(data));
      });

      socket.on("isTyping", (data) => {
        dispatch(setTyping(data));
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
