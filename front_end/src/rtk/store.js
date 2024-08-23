import { configureStore } from "@reduxjs/toolkit";
import authSlice from "./slices/auth_slice";

export const store = configureStore({
    reducer: {
        auth: authSlice,
    },
});