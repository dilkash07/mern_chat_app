import React from "react";
import Header from "../components/message/Header";
import { useParams } from "react-router-dom";
import Messages from "../components/message/Messages";

const Message = () => {
  const { id } = useParams();

  return (
    <div className="h-full w-full hidden md:flex flex-col">
      <Header />
      <Messages />
    </div>
  );
};

export default Message;
