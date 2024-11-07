import React, { useState } from "react";
import { BiMessageRoundedDetail } from "react-icons/bi";
import { FaUserPlus } from "react-icons/fa6";
import { FaRegUserCircle } from "react-icons/fa";
import { FiLogOut } from "react-icons/fi";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Profile from "../user/Profile";
import { logout } from "../../services/operations/AuthAPI";
import { getUsers } from "../../services/operations/UserAPI";

const SideNave = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { token } = useSelector((state) => state.auth);
  const { user } = useSelector((state) => state.user);
  const [openProfile, setOpenProfile] = useState(false);

  const logoutHandler = () => {
    dispatch(logout(navigate));
  };

  const clickHandler = () => {
    dispatch(getUsers(token));
  };

  return (
    <div className="w-fit px-2 py-5 flex flex-col justify-between bg-orange-200 -mt-1">
      <div className="flex flex-col gap-3 items-center">
        <BiMessageRoundedDetail size={23} onClick={() => navigate("/")} />
        <FaUserPlus size={23} onClick={clickHandler} />
      </div>
      <div
        className="flex flex-col gap-3 items-center"
        onClick={() => setOpenProfile((prev) => !prev)}
      >
        {user === null ? (
          <FaRegUserCircle size={23} />
        ) : (
          <img
            src={user?.profilePic.image_url}
            alt={user?.firstName}
            className="w-6 aspect-square object-cover rounded-full"
          />
        )}

        <FiLogOut size={23} onClick={logoutHandler} />
      </div>

      {openProfile && <Profile setOpenProfile={setOpenProfile} />}
    </div>
  );
};

export default SideNave;
