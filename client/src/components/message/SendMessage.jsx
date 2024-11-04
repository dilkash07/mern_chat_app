import React, { useEffect, useState } from "react";
import { GrAttachment } from "react-icons/gr";
import { LuSendHorizonal } from "react-icons/lu";
import { useDispatch, useSelector } from "react-redux";
import { sendMessage } from "../../services/operations/MessageAPI";
import { useSocket } from "../../context/SocketContext";
import { useParams } from "react-router-dom";

const SendMessage = () => {
  const dispatch = useDispatch();
  const { token } = useSelector((state) => state.auth);
  const { user } = useSelector((state) => state.user);
  const [message, setMessage] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const socket = useSocket();
  const { id } = useParams();

  const changeHandler = (event) => {
    setMessage(event.target.value);

    setIsTyping(true);
    socket.emit("typing", { id, sender: user._id, isTyping: true });
  };

  useEffect(() => {
    if (isTyping) {
      setTimeout(() => {
        setIsTyping(false);
        socket.emit("typing", { id, sender: user._id, isTyping: false });
      }, 2000);
    }
  }, [isTyping]);

  const submitHandler = (event) => {
    event.preventDefault();
    dispatch(sendMessage(message, id, token));
    setMessage("");
  };

  return (
    <form
      className="px-5 bg-white flex gap-5 items-center border-t"
      onSubmit={submitHandler}
    >
      <GrAttachment size={20} />
      <input
        type="text"
        placeholder="Type a message"
        className="w-full outline-none bg-transparent cursor-default"
        onChange={changeHandler}
        value={message}
        autoFocus
      />
      <button>
        <LuSendHorizonal size={20} />
      </button>
    </form>
  );
};

export default SendMessage;
