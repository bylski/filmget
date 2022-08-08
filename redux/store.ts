import { configureStore, createSlice } from "@reduxjs/toolkit";
import { movieInterface } from "../utils/types";

const initialState: {
  isShown: boolean;
  originElement: any;
  modalData: movieInterface | null;
} = {
  isShown: false,
  modalData: null,
  originElement: null,
};

const modalSlice = createSlice({
  name: "modal",
  initialState,
  reducers: {
    showModal(state, actions) {
      (state.isShown = true),
        (state.modalData = { ...actions.payload.data }),
        (state.originElement = actions.payload.originElement);
    },
    hideModal(state) {
      state.isShown = false;
    },
  },
});

const store = configureStore({
  reducer: modalSlice.reducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export const modalActions = modalSlice.actions;
export default store;

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
