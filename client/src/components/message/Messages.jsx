import React, { useEffect, useRef } from "react";
import backgroundImage from "../../assets/wallpaper.png";
import { useSelector } from "react-redux";
import moment from "moment";
import { BiCheckDouble } from "react-icons/bi";
import { FaRegFileLines } from "react-icons/fa6";
import { transformImage } from "../utils/features";

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
    <div
      className="p-5 bg-no-repeat bg-cover overflow-y-scroll scrollbar-none"
      style={{ backgroundImage: `url(${backgroundImage})` }}
    >
      {messages?.map((message) => (
        <div key={message._id} ref={messagesEndRef}>
          {user?._id === message.sender ? (
            <div className="chat chat-end mb-1">
              <div className="chat-bubble chat-bubble-error flex gap-5 items-center bg-green-200">
                {message.attachment === null ? (
                  <p>{message.text}</p>
                ) : (
                  <div>
                    {message.attachment.url.endsWith(".mp4") ? (
                      <video
                        controls
                        src={message.attachment.url}
                        preload="none"
                        width={"200px"}
                      ></video>
                    ) : message.attachment.url.endsWith(".mp3") ? (
                      <audio controls src={message.attachment.url}></audio>
                    ) : message.attachment.url.match(
                        /\.(jpeg|jpg|png|gif)$/
                      ) ? (
                      <img
                        src={transformImage(message.attachment.url, 200)}
                        alt="attachment"
                      />
                    ) : (
                      <a
                        href={message.attachment.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex gap-1 items-center"
                      >
                        <FaRegFileLines /> View File
                      </a>
                    )}
                    <p>{message.text}</p>
                  </div>
                )}

                <p className="text-xs flex gap-1 justify-end items-center mt-5">
                  {moment(message.createdAt).format("HH:mm")}
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
                {message.attachment === null ? (
                  <p>{message.text}</p>
                ) : (
                  <div>
                    {message.attachment.url.endsWith(".mp4") ? (
                      <video
                        controls
                        src={message.attachment.url}
                        preload="none"
                        width={"200px"}
                      ></video>
                    ) : message.attachment.url.endsWith(".mp3") ? (
                      <audio controls src={message.attachment.url}></audio>
                    ) : message.attachment.url.match(
                        /\.(jpeg|jpg|png|gif)$/
                      ) ? (
                      <img
                        src={transformImage(message.attachment.url, 200)}
                        alt="attachment"
                      />
                    ) : (
                      <a
                        href={message.attachment.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex gap-1 items-center"
                      >
                        <FaRegFileLines /> View File
                      </a>
                    )}
                    <p>{message.text}</p>
                  </div>
                )}
                <p className="text-xs text-end mt-5">
                  {moment(message.createdAt).format("hh:mm")}
                </p>
              </div>
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default Messages;
