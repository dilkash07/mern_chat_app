import React from "react";
import { useSelector } from "react-redux";

const Header = () => {
  const { receiver } = useSelector((state) => state.message);
  const { onlineUsers } = useSelector((state) => state.user);

  return (
    <div className="bg-white px-4 py-2 border-b flex gap-2 items-center">
      <img
        src={receiver?.profilePic.image_url}
        alt={receiver?.firstName}
        className="w-10 aspect-square rounded-full"
      />
      <div>
        <h1 className="text-md font-bold">
          {receiver?.firstName + " " + receiver?.lastName}
        </h1>
        <p className="text-sm text-gray-600">
          {onlineUsers?.includes(receiver?._id)
            ? "Online"
            : "last seen today at: 11:20"}
        </p>
      </div>
    </div>
  );
};

export default Header;
