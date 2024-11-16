import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  receiver: null,
  messages: [],
  typing: [],
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
      if (
        !state.typing.find((typing) => typing.sender === action.payload.sender)
      ) {
        state.typing.push(action.payload);
      }
    },
    removeTyping(state, action) {
      state.typing = state.typing.filter(
        (typing) => typing.sender !== action.payload.sender
      );
    },
  },
});

export const {
  setReceiver,
  setMessages,
  setNewMessage,
  setTyping,
  removeTyping,
} = messageSlice.actions;
export default messageSlice.reducer;
