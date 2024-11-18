import React, { useEffect, useState } from "react";
import { GrAttachment } from "react-icons/gr";
import { LuSendHorizonal } from "react-icons/lu";
import { useDispatch, useSelector } from "react-redux";
import { sendMessage } from "../../services/operations/MessageAPI";
import { useSocket } from "../../context/SocketContext";
import { useParams } from "react-router-dom";
import Attach from "./Attach";

const SendMessage = () => {
  const dispatch = useDispatch();
  const { token } = useSelector((state) => state.auth);
  const { user } = useSelector((state) => state.user);
  const [text, setText] = useState("");
  const [file, setFile] = useState(null);
  const [isTyping, setIsTyping] = useState(false);
  const [attach, setAttach] = useState(false);
  const socket = useSocket();
  const { id } = useParams();

  const changeHandler = (event) => {
    setText(event.target.value);

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

    const formData = new FormData();
    formData.append("text", text);
    formData.append("file", file);

    dispatch(sendMessage(formData, id, token));
    setText("");
    setFile(null);
  };

  return (
    <form
      className="px-5 bg-white flex gap-5 items-center border-t"
      onSubmit={submitHandler}
    >
      <GrAttachment size={20} onClick={() => setAttach((prev) => !prev)} />

      {attach && <Attach setFile={setFile} setAttach={setAttach} />}

      <input
        type="text"
        placeholder={`${
          file === null ? "Type a message" : "Caption (otional)"
        }`}
        className="w-full outline-none bg-transparent cursor-default"
        onChange={changeHandler}
        value={text}
        autoFocus
      />
      <button>
        <LuSendHorizonal size={20} />
      </button>
    </form>
  );
};

export default SendMessage;
