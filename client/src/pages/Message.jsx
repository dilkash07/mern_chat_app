import React, { useEffect } from "react";
import Header from "../components/message/Header";
import { useParams } from "react-router-dom";
import Messages from "../components/message/Messages";
import { useSocket } from "../context/SocketContext";
import { useDispatch, useSelector } from "react-redux";
import backgroundImage from "../assets/wallpaper.png";
import { getMessages } from "../services/operations/MessageAPI";

const Message = () => {
  const socket = useSocket();
  const dispatch = useDispatch();
  const { token } = useSelector((state) => state.auth);
  const { user } = useSelector((state) => state.user);
  const { messages } = useSelector((state) => state.message);
  const { id } = useParams();

  useEffect(() => {
    if (token !== null) {
      dispatch(getMessages(id, token));
    }
  }, [id]);

  useEffect(() => {
    if (socket && user) {
      socket.emit("enterPage", { sender: user._id, receiver: id });
    }

    return () => {
      if (socket) {
        socket.emit("leavePage", { sender: user._id });
      }
    };
  }, [id, socket, user]);

  return (
    <div className="h-full w-full flex flex-col ">
      <Header />
      {messages ? (
        <Messages />
      ) : (
        <div
          className="h-full bg-no-repeat bg-cover grid place-items-center text-xl"
          style={{ backgroundImage: `url(${backgroundImage})` }}
        >
          Say! Hi to start the conversation
        </div>
      )}
    </div>
  );
};

export default Message;
