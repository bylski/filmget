import { configureStore } from "@reduxjs/toolkit";
import { modalSlice, mediaFilterSlice, registerInputsSlice, loginInputsSlice } from "./slices";

const store = configureStore({
  reducer: {
    modal: modalSlice.reducer,
    mediaFilter: mediaFilterSlice.reducer,
    registerInputs: registerInputsSlice.reducer,
    loginInputs: loginInputsSlice.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export const modalActions = modalSlice.actions;
export const mediaFilterActions = mediaFilterSlice.actions;
export const registerInputsActions = registerInputsSlice.actions;
export const loginInputsActions = loginInputsSlice.actions;
export default store;

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
