import React, { useEffect } from "react";
import SideNave from "../components/core/SideNave";
import Users from "../components/user/Users";
import { useDispatch, useSelector } from "react-redux";
import { getUserProfile, getUsers } from "../services/operations/UserAPI";

import { Outlet } from "react-router-dom";

const Home = () => {
  const dispatch = useDispatch();
  const { token } = useSelector((state) => state.auth);

  useEffect(() => {
    if (token !== null) {
      dispatch(getUsers(token));
      dispatch(getUserProfile(token));
    }
  }, []);

  return (
    <div className="h-screen w-screen flex">
      <div className="w-full h-full flex">
        <div className="w-full md:max-w-fit h-full flex bg-orange-200">
          <SideNave />
          <Users />
        </div>
        <Outlet />
      </div>
    </div>
  );
};

export default Home;
