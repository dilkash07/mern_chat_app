import React, { useState } from "react";
import { GrAttachment } from "react-icons/gr";
import { LuSendHorizonal } from "react-icons/lu";

const SendMessage = () => {
  const [message, setMessage] = useState("");

  const changeHandler = (event) => {
    setMessage(event.target.value);
  };
  const submitHandler = (event) => {
    event.preventDefault();

    console.log(message);

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
