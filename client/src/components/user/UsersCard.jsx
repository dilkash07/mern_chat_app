import React from "react";
import { useSelector } from "react-redux";
import { NavLink } from "react-router-dom";

const UsersCard = ({ user }) => {
  const { onlineUsers } = useSelector((state) => state.user);

  return (
    <NavLink
      to={`/message/${user._id}`}
      className={({ isActive }) =>
        `md:w-72 px-2 py-1.5 rounded-md flex gap-2 items-center cursor-default hover:bg-gray-100 ${
          isActive && "bg-gray-200 bg-opacity-50"
        }`
      }
    >
      <div className="max-w-1/6 relative">
        <img
          src={user.profilePic.image_url}
          alt={user.firstName}
          className="w-10 aspect-square rounded-full"
        />
        {onlineUsers?.includes(user._id) && (
          <div className="h-2 w-2 rounded-full bg-blue-500 absolute top-1 right-0"></div>
        )}
      </div>

      <div className="w-5/6 text-sm">
        <p className="font-bold line-clamp-1">
          {user.firstName + " " + user.lastName}
        </p>
        <p className="line-clamp-2">{user.about}</p>
      </div>
    </NavLink>
  );
};

export default UsersCard;
