import React from "react";
import { useDispatch } from "react-redux";
import { setSelectedUser } from "../../redux/slice/UserSlice";
import { NavLink } from "react-router-dom";

const Card = ({ user }) => {
  return (
    <NavLink
      to={`/message/${user._id}`}
      className={({ isActive }) =>
        `px-2 py-1.5 rounded-md flex gap-2 items-center cursor-default hover:bg-gray-100 ${
          isActive && "bg-gray-200 bg-opacity-50"
        }`
      }
    >
      <img
        src={user.profilePic.image_url}
        alt={user.firstName}
        className="w-10 aspect-square rounded-full"
      />
      <p className="text-sm font-bold">
        {user.firstName + " " + user.lastName}
      </p>
    </NavLink>
  );
};

export default Card;
