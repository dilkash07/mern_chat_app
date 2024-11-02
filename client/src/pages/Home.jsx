import React, { useEffect } from "react";
import SideNave from "../components/core/SideNave";
import Users from "../components/user/Users";
import { useDispatch, useSelector } from "react-redux";
import { getUserProfile, getUsers } from "../services/operations/UserAPI";
import { Outlet } from "react-router-dom";
import io from "socket.io-client";
import { setOnlineUsers } from "../redux/slice/UserSlice";
import { setMessages, setNewMessage } from "../redux/slice/MessageSlice";
import { playNotification } from "../components/utils/audioPlayer";
import notificationSound from "../assets/notification.mp3";

const Home = () => {
  const dispatch = useDispatch();
  const { token } = useSelector((state) => state.auth);
  const { user } = useSelector((state) => state.user);

  useEffect(() => {
    if (token !== null) {
      dispatch(getUsers(token));
      dispatch(getUserProfile(token));
    }
  }, []);

  useEffect(() => {
    if (user !== null) {
      const socket = io(import.meta.env.VITE_SERVER_URL, {
        query: {
          userId: user._id,
        },
      });

      socket.on("onlineUsers", (data) => {
        dispatch(setOnlineUsers(data));
      });

      socket.on("receive_message", (data) => {
        playNotification(notificationSound);
        dispatch(setNewMessage(data));
      });
    }
  }, [user]);

  return (
    <div className="h-screen w-screen flex">
      <div className="w-full h-full flex">
        <div className="w-full md:max-w-fit h-full flex bg-orange-200">
          <SideNave />
          <Users />
        </div>
        <Outlet />
      </div>
    </div>
  );
};

export default Home;
