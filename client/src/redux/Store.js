import { configureStore } from "@reduxjs/toolkit";
import loaderReducer from "./slice/LoaderSlice";
import authReducer from "./slice/AuthSlice";
import userReducer from "./slice/UserSlice";
import messageReducer from "./slice/MessageSlice";

const store = configureStore({
  reducer: {
    loader: loaderReducer,
    auth: authReducer,
    user: userReducer,
    message: messageReducer,
  },
});

export default store;
