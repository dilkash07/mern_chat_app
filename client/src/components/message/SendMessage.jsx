import React, { useState } from "react";
import { GrAttachment } from "react-icons/gr";
import { LuSendHorizonal } from "react-icons/lu";
import { useDispatch, useSelector } from "react-redux";
import { sendMessage } from "../../services/operations/MessageAPI";

const SendMessage = () => {
  const dispatch = useDispatch();
  const { token } = useSelector((state) => state.auth);
  const { receiver } = useSelector((state) => state.message);
  const [message, setMessage] = useState("");

  const changeHandler = (event) => {
    setMessage(event.target.value);
  };

  const submitHandler = (event) => {
    event.preventDefault();

    dispatch(sendMessage(message, receiver._id, token));

    setMessage("");
  };

  return (
    <form
      className="px-5 flex gap-5 items-center border-t"
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
