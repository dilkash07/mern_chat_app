import React, { useEffect, useState } from "react";
import SideNave from "../components/core/SideNave";
import Users from "../components/user/Users";
import { useDispatch, useSelector } from "react-redux";
import { getConversationUsers } from "../services/operations/UserAPI";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import { VscLockSmall } from "react-icons/vsc";

const Home = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { token } = useSelector((state) => state.auth);
  const { messages } = useSelector((state) => state.message);
  const location = useLocation();
  const basePath = location.pathname === "/";

  useEffect(() => {
    if (token !== null) {
      dispatch(getConversationUsers(token, navigate));
    }
  }, [messages]);

  return (
    <div className="h-screen w-screen flex">
      <SideNave />
      <div className="w-full h-full md:flex bg-orange-200">
        <section
          className={`h-full ${!basePath && "w-full md:w-fit hidden md:block"}`}
        >
          <Users />
        </section>

        <section
          className={`h-full w-full bg-white ${
            basePath && "hidden md:grid place-content-center"
          }`}
        >
          {basePath ? (
            <div className="h-full flex flex-col justify-center items-center gap-10">
              <div className="grid gap-2 place-items-center">
                <p className="text-2xl text-orange-600 font-bold">
                  Mansuri<span className="text-black">Chat</span>
                </p>
                <div className="text-sm text-gray-600 flex flex-col items-center">
                  <p>Select user to send message</p>
                  <p>Send and receive messages online</p>
                </div>
              </div>
              <div className="text-gray-500 text-sm flex gap-1 items-center">
                <VscLockSmall size={18} />
                <p>End-to-end encrypted</p>
              </div>
            </div>
          ) : (
            <Outlet />
          )}
        </section>
      </div>
    </div>
  );
};

export default Home;
