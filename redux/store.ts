import { configureStore } from "@reduxjs/toolkit";
import { modalSlice, mediaFilterSlice, registerInputsSlice, loginInputsSlice, cropModalSlice, accountSlice } from "./slices";

const store = configureStore({
  reducer: {
    modal: modalSlice.reducer,
    mediaFilter: mediaFilterSlice.reducer,
    registerInputs: registerInputsSlice.reducer,
    loginInputs: loginInputsSlice.reducer,
    cropModal: cropModalSlice.reducer,
    account: accountSlice.reducer,
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
export const cropModalActions = cropModalSlice.actions;
export const accountActions = accountSlice.actions;
export default store;

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
