import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  receiver: null,
  messages: [],
  typing: false,
};

const messageSlice = createSlice({
  name: "message",
  initialState,
  reducers: {
    setReceiver(state, action) {
      state.receiver = action.payload;
    },
    setMessages(state, action) {
      state.messages = action.payload;
    },
    setNewMessage(state, action) {
      if (!Array.isArray(state.messages)) {
        state.messages = [];
      }
      state.messages.push(action.payload);
    },
    setTyping(state, action) {
      state.typing = action.payload;
    },
  },
});

export const { setReceiver, setMessages, setNewMessage, setTyping } =
  messageSlice.actions;
export default messageSlice.reducer;
