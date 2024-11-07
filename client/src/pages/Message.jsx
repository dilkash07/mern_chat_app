import React, { useEffect } from "react";
import Header from "../components/message/Header";
import { useParams } from "react-router-dom";
import Messages from "../components/message/Messages";
import { useSocket } from "../context/SocketContext";
import { useDispatch, useSelector } from "react-redux";
import { getMessages } from "../services/operations/MessageAPI";
import SendMessage from "../components/message/SendMessage";
import EmptyMessages from "../components/message/EmptyMessages";

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
    <div className="h-full w-full flex flex-col relative">
      <Header />

      <div className="h-[calc(100vh-101px)] grid grid-rows-[9fr,1fr]">
        {messages ? <Messages /> : <EmptyMessages />}

        <SendMessage />
      </div>
    </div>
  );
};

export default Message;
