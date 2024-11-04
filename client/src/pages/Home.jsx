import React, { useEffect, useState } from "react";
import SideNave from "../components/core/SideNave";
import Users from "../components/user/Users";
import { useDispatch, useSelector } from "react-redux";
import { getUserProfile, getUsers } from "../services/operations/UserAPI";
import { Outlet, useLocation, useParams } from "react-router-dom";

const Home = () => {
  const dispatch = useDispatch();
  const { token } = useSelector((state) => state.auth);
  const location = useLocation();
  const basePath = location.pathname === "/";

  useEffect(() => {
    if (token !== null) {
      dispatch(getUsers(token));
      dispatch(getUserProfile(token));
    }
  }, []);

  return (
    <div className="h-screen w-screen flex">
      <SideNave />
      <div className="w-full h-full md:flex bg-orange-200">
        <section
          className={`${!basePath && "w-full md:w-fit hidden md:block"}`}
        >
          <Users />
        </section>

        <section
          className={`h-full w-full bg-white ${
            basePath && "hidden md:grid place-content-center"
          }`}
        >
          {basePath ? <div>Select user to send message</div> : <Outlet />}
        </section>
      </div>
    </div>
  );
};

export default Home;
