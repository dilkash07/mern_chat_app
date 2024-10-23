import { configureStore } from "@reduxjs/toolkit";
import loaderReducer from "./slice/LoaderSlice";
import authReducer from "./slice/AuthSlice";
import userReducer from "./slice/UserSlice";

const store = configureStore({
  reducer: {
    loader: loaderReducer,
    auth: authReducer,
    user: userReducer,
  },
});

export default store;
