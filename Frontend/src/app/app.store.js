import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../features/auth/state/auth.slice.js";
import locationReducer from "../features/dashboard/state/location.slice.js";

export const store = configureStore({
    reducer: {
        auth: authReducer,
        location: locationReducer,
    },
});