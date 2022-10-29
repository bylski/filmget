import { movieInterface, seriesInterface } from "../utils/types";
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
  ratingRange: [number, number];
} = {
  selectedGenresIds: [],
  ratingRange: [0, 10],
};

export const mediaFilterSlice = createSlice({
  name: "mediaFilter",
  initialState: mediaFilterInitialState,
  reducers: {
    getSelectedGenres(state, actions) {
      state.selectedGenresIds = actions.payload.selectedGenres;
    },
    getRatingRange(state, actions) {
      state.ratingRange = actions.payload.ratingRange;
    },
  },
});

const registerInputsInitialState: {
  username: string;
  email: string;
  password: string;
} = {
  username: "",
  email: "",
  password: "",
};

export const registerInputsSlice = createSlice({
  name: "registerInputs",
  initialState: registerInputsInitialState,
  reducers: {
    getInputsData(state, actions) {
      if (actions.payload.type === "Username") {
        state.username = actions.payload.data;
      }
      if (actions.payload.type === "Email") {
        state.email = actions.payload.data;
      }
      if (actions.payload.type === "Password") {
        state.password = actions.payload.data;
      }
    },
  },
});

const loginInputsInitialState: {
  username: string;
  password: string;
} = {
  username: "",
  password: "",
};

export const loginInputsSlice = createSlice({
  name: "loginInputs",
  initialState: loginInputsInitialState,
  reducers: {
    getInputsData(state, actions) {
      if (actions.payload.type === "Username") {
        state.username = actions.payload.data;
      }
      if (actions.payload.type === "Password") {
        state.password = actions.payload.data;
      }
    },
  },
});

const cropModalInitialState: { isShown: boolean; imgSrc: string } = {
  isShown: false,
  imgSrc: "",
};

export const cropModalSlice = createSlice({
  name: "cropModal",
  initialState: cropModalInitialState,
  reducers: {
    showModal(state, actions) {
      state.isShown = true;
      state.imgSrc = actions.payload.imgSrc;
    },
    hideModal(state) {
      state.isShown = false;
    },
  },
});

const accountInitialState: {
  username: string,
  email: string,
  signUpDate: Date | null;
  avatarSrc: string,
  toWatch: {
    mediaToWatch: movieInterface[] | seriesInterface[];
    mediaIds: number[];
  };
} = {
  username: "",
  email: "",
  signUpDate: null,
  avatarSrc: "",
  toWatch: {
    mediaToWatch: [],
    mediaIds: [],
  },
};

export const accountSlice = createSlice({
  name: "account",
  initialState: accountInitialState,
  reducers: {
    setAvatarSrc(state, action) {
      state.avatarSrc = action.payload;
    },
    setUsername(state, action) {
      state.username = action.payload;
    },
    setToWatch(state, action) {
      state.toWatch.mediaToWatch = action.payload.mediaToWatch;
      state.toWatch.mediaIds = action.payload.mediaIds;
    },
    deleteToWatch(state, action) {
      const idToDelete = action.payload.id;
      const { mediaIds, mediaToWatch } = state.toWatch;
      console.log(state.toWatch.mediaIds);
      if (state.toWatch.mediaIds.includes(idToDelete)) {
        // Search for index of the movie user wants to delete
        const idIndex = mediaIds.indexOf(idToDelete);
        const dataIndex = mediaToWatch.indexOf(idToDelete);
        // Delete desired data from state
        state.toWatch.mediaIds.splice(idIndex, 1);
        state.toWatch.mediaToWatch.splice(dataIndex, 1);
      }
    },
    addToWatch(state, action) {
      state.toWatch.mediaIds = [...state.toWatch.mediaIds, action.payload.id];
      state.toWatch.mediaToWatch = [...state.toWatch.mediaToWatch, action.payload];
    }
  },
});
