import React from "react";
import { useSelector } from "react-redux";
import { NavLink } from "react-router-dom";

const Card = ({ user }) => {
  const { onlineUsers } = useSelector((state) => state.user);

  return (
    <NavLink
      to={`/message/${user._id}`}
      className={({ isActive }) =>
        `px-2 py-1.5 rounded-md flex gap-2 items-center cursor-default hover:bg-gray-100 ${
          isActive && "bg-gray-200 bg-opacity-50"
        }`
      }
    >
      <div className="relative">
        <img
          src={user.profilePic.image_url}
          alt={user.firstName}
          className="w-10 aspect-square rounded-full"
        />
        {onlineUsers?.includes(user._id) && (
          <div className="h-2 w-2 rounded-full bg-blue-500 absolute top-1 right-0"></div>
        )}
      </div>
      <p className="text-sm font-bold">
        {user.firstName + " " + user.lastName}
      </p>
    </NavLink>
  );
};

export default Card;
