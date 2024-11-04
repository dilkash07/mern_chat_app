import React, { useEffect, useRef } from "react";
import backgroundImage from "../../assets/wallpaper.png";
import SendMessage from "./SendMessage";
import { useSelector } from "react-redux";
import moment from "moment";
import { BiCheckDouble } from "react-icons/bi";

const Messages = () => {
  const { user } = useSelector((state) => state.user);
  const { messages } = useSelector((state) => state.message);

  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({
      behavior: "smooth",
    });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  return (
    <div className="h-[calc(100vh-101px)] grid grid-rows-[9fr,1fr]">
      <div
        className="p-5 bg-no-repeat bg-cover overflow-y-scroll scrollbar-none"
        style={{ backgroundImage: `url(${backgroundImage})` }}
      >
        {messages?.map((message) => (
          <div key={message._id} ref={messagesEndRef}>
            {user?._id === message.sender ? (
              <div className="chat chat-end mb-1">
                <div className="chat-bubble chat-bubble-error flex gap-5 items-center bg-green-200">
                  {message.text}
                  <p className="text-xs flex gap-1 justify-end items-center mt-5">
                    {moment(message.createdAt).format("hh:mm")}
                    <BiCheckDouble
                      size={18}
                      className={`${
                        message.seen ? "text-blue-600" : "text-gray-500"
                      }`}
                    />
                  </p>
                </div>
              </div>
            ) : (
              <div className="chat chat-start mb-1">
                <div
                  className={`chat-bubble chat-bubble-accent flex gap-5 items-center bg-orange-200`}
                >
                  {message.text}
                  <p className="text-xs text-end mt-5">
                    {moment(message.createdAt).format("hh:mm")}
                  </p>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
      <SendMessage />
    </div>
  );
};

export default Messages;
