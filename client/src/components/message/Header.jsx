import React from "react";
import { useSelector } from "react-redux";

const Header = () => {
  const { user } = useSelector((state) => state.user);
  return (
    <div className="bg-white px-4 py-2 border-b flex gap-2 items-center">
      <img
        src={user?.profilePic.image_url}
        alt={user?.firstName}
        className="w-10 aspect-square rounded-full"
      />
      <div>
        <h1 className="text-md font-bold">
          {user?.firstName + " " + user?.lastName}
        </h1>
        <p className="text-sm text-gray-600">last seen today at: 11:20</p>
      </div>
    </div>
  );
};

export default Header;
