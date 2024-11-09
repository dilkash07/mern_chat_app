import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  users: null,
  conversationUsers: null,
  user: null,
  onlineUsers: null,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUsers(state, action) {
      state.users = action.payload;
    },
    setConversationUsers(state, action) {
      state.conversationUsers = action.payload;
    },
    setUser(state, action) {
      state.user = action.payload;
    },
    setOnlineUsers(state, action) {
      state.onlineUsers = action.payload;
    },
  },
});

export const { setUsers, setConversationUsers, setUser, setOnlineUsers } =
  userSlice.actions;
export default userSlice.reducer;
