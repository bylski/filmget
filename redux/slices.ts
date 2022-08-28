import { movieInterface } from "../utils/types";
import { createSlice } from "@reduxjs/toolkit";

const modalInitialState: {
    isShown: boolean;
    originPosition: any;
    modalData: movieInterface | null;
  } = {
    isShown: false,
    modalData: null,
    originPosition: null,
  };
  
export const modalSlice = createSlice({
    name: "modal",
    initialState: modalInitialState,
    reducers: {
      showModal(state, actions) {
        (state.isShown = true),
          (state.modalData = { ...actions.payload.data }),
          (state.originPosition = actions.payload.originPosition);
      },
      hideModal(state) {
        state.isShown = false;
      },
    },
  });


const mediaFilterInitialState: {
    selectedGenresIds: number[];
} = {
    selectedGenresIds: []
}

export const mediaFilterSlice = createSlice({
    name: "mediaFilter",
    initialState: mediaFilterInitialState,
    reducers: {
      getSelectedGenres(state, actions) {
        state.selectedGenresIds = actions.payload.selectedGenres;
      }
    },
})
  