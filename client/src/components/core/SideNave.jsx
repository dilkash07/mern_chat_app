import React from "react";
import { BiMessageRoundedDetail } from "react-icons/bi";
import { FaUserPlus } from "react-icons/fa6";
import { FaRegUserCircle } from "react-icons/fa";
import { FiLogOut } from "react-icons/fi";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const SideNave = () => {
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.user);

  return (
    <div className="w-fit px-2 py-5 flex flex-col justify-between bg-orange-200 -mt-1">
      <div className="flex flex-col gap-3 items-center">
        <BiMessageRoundedDetail size={20} onClick={() => navigate("/")} />
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
