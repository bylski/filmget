import { configureStore, createSlice } from "@reduxjs/toolkit";
import { movieInterface } from "../utils/types";
import { modalSlice, mediaFilterSlice } from "./slices";

const store = configureStore({
  reducer: {modal: modalSlice.reducer, mediaFilter: mediaFilterSlice.reducer},
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export const modalActions = modalSlice.actions;
export const mediaFilterActions = mediaFilterSlice.actions;
export default store;

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
