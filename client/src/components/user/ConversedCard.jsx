import React from "react";
import { BiCheckDouble } from "react-icons/bi";
import { useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import { formattedMessageTime } from "../utils/lastSeenFormatter";

const ConversedCard = ({ convUser }) => {
  const { user } = useSelector((state) => state.user);
  const { onlineUsers } = useSelector((state) => state.user);
  const { receiver, typing } = useSelector((state) => state.message);
  const member = convUser.members[0];

  return (
    <NavLink
      to={`/message/${member._id}`}
      className={({ isActive }) =>
        `max-w-screen-md md:w-72 px-2 py-1.5 rounded-md flex gap-2 items-center cursor-default hover:bg-gray-100 ${
          isActive && "bg-gray-200 bg-opacity-50"
        }`
      }
    >
      <div className="max-w-1/6 relative ">
        <img
          src={member.profilePic.image_url}
          alt={member.firstName}
          className="w-10 aspect-square rounded-full"
        />
        {onlineUsers?.includes(member._id) && (
          <div className="h-2 w-2 rounded-full bg-blue-500 absolute top-1 right-0"></div>
        )}
      </div>

      <div className="w-5/6 text-sm">
        <div className="flex justify-between ">
          <p className="font-bold line-clamp-1">
            {member.firstName + " " + member.lastName}
          </p>
          <p
            className={`${
              convUser.unSeenMessage > 0 &&
              user._id !== convUser.lastMessage.sender &&
              "text-orange-500"
            }`}
          >
            {formattedMessageTime(convUser.lastMessage.createdAt)}
          </p>
        </div>

        <div className="max-w-5/6 flex gap-1 justify-between items-center">
          <div>
            <BiCheckDouble
              size={25}
              className={`${
                user._id !== convUser.lastMessage.sender && "hidden"
              } ${
                convUser.lastMessage.seen ? "text-blue-600" : "text-gray-500"
              }`}
            />
          </div>

          <p className="mr-auto w-11/12 line-clamp-1">
            {convUser.lastMessage.text}
          </p>

          <div
            className={`w-4 aspect-square grid place-content-center bg-orange-500 text-white text-xs font-semibold  rounded-full ${
              user._id === convUser.lastMessage.sender && "hidden"
            } ${convUser.unSeenMessage < 1 && "hidden"}`}
          >
            <p>{convUser.unSeenMessage}</p>
          </div>
        </div>
      </div>
    </NavLink>
  );
};

export default ConversedCard;
