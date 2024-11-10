import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { LiaSearchSolid } from "react-icons/lia";
import UsersCard from "./UsersCard";
import ConversedCard from "./ConversedCard";
import { getSearchUser } from "../../services/operations/UserAPI";
import { RxCross2 } from "react-icons/rx";
import { setUsers } from "../../redux/slice/UserSlice";

const Users = () => {
  const dispatch = useDispatch();
  const { token } = useSelector((state) => state.auth);
  const { users, conversationUsers } = useSelector((state) => state.user);
  const [query, setQuery] = useState("");

  const changeHandler = (event) => {
    const query = event.target.value;
    setQuery(query);
    if (query.length > 0) {
      dispatch(getSearchUser(event.target.value, token));
    } else {
      dispatch(setUsers(null));
    }
  };

  return (
    <div className="h-full w-full flex flex-col gap-2 px-2 py-3 bg-white rounded-ss-lg border-r">
      <h1 className="font-bold mb-2">Chats</h1>
      <div className="px-2 text-sm rounded-md bg-gray-100 border border-b-2 border-b-orange-500 flex justify-start items-center">
        <LiaSearchSolid size={14} />
        <input
          type="text"
          placeholder="Search or start a new chat"
          className="w-full outline-none px-1 py-0.5 rounded-md bg-gray-100"
          onChange={changeHandler}
          value={query}
        />
        <RxCross2
          size={18}
          className={`cursor-pointer ${query.length < 1 && "hidden"}`}
          onClick={() => setQuery("")}
        />
      </div>

      <div className="h-[78vh] w-full flex flex-col gap-1.5 overflow-y-scroll scrollbar-none mt-2">
        {users !== null
          ? users?.map((user) => <UsersCard user={user} key={user._id} />)
          : conversationUsers?.conversations.map((convUser) => (
              <ConversedCard convUser={convUser} key={convUser._id} />
            ))}
      </div>
    </div>
  );
};

export default Users;
