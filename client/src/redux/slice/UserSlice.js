import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  users: null,
  user: null,
  selectedUser: null,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUsers(state, action) {
      state.users = action.payload;
    },
    setUser(state, action) {
      state.user = action.payload;
    },
    setSelectedUser(state, action) {
      state.selectedUser = action.payload;
    },
  },
});

export const { setUsers, setUser, setSelectedUser } = userSlice.actions;
export default userSlice.reducer;
