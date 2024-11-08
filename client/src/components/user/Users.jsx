import React from "react";
import { useSelector } from "react-redux";
import { LiaSearchSolid } from "react-icons/lia";
import UsersCard from "./UsersCard";
import ConversationCard from "./ConversationCard";

const Users = () => {
  const { users, conversationUsers } = useSelector((state) => state.user);

  return (
    <div className="h-full w-full flex flex-col gap-2 px-2 py-3 bg-white rounded-ss-lg border-r">
      <h1 className="font-bold mb-2">Chats</h1>
      <div className="px-2 text-sm rounded-md bg-gray-100 border border-b-2 border-b-orange-500 flex justify-start items-center">
        <LiaSearchSolid size={14} />
        <input
          type="text"
          placeholder="Search or start a new chat"
          className="outline-none px-1 py-0.5 rounded-md bg-gray-100"
        />
      </div>

      <div className="h-[78vh] flex flex-col gap-1.5 overflow-y-scroll scrollbar-none mt-2">
        {users !== null
          ? users?.map((user) => <UsersCard user={user} key={user._id} />)
          : conversationUsers?.conversations.map((convUser) => (
              <ConversationCard convUser={convUser} key={convUser._id} />
            ))}
      </div>
    </div>
  );
};

export default Users;
