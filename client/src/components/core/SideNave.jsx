import React from "react";
import { BiMessageRoundedDetail } from "react-icons/bi";
import { FaUserPlus } from "react-icons/fa6";
import { FaRegUserCircle } from "react-icons/fa";
import { FiLogOut } from "react-icons/fi";
import { useSelector } from "react-redux";

const SideNave = () => {
  const { user } = useSelector((state) => state.user);

  return (
    <div className="px-2 py-4 flex flex-col justify-between">
      <div className="flex flex-col gap-3 items-center">
        <BiMessageRoundedDetail size={25} />
        <FaUserPlus size={20} />
      </div>
      <div className="flex flex-col gap-3 items-center">
        {user === null ? (
          <FaRegUserCircle size={20} />
        ) : (
          <img
            src={user.profilePic.image_url}
            alt={user.profilePic.image_url}
            className="aspect-square rounded-full"
          />
        )}

        <FiLogOut size={20} />
      </div>
    </div>
  );
};

export default SideNave;
