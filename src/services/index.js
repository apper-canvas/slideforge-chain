import { configureStore } from "@reduxjs/toolkit";

const initialState = {
  presentations: [],
  slides: [],
  elements: []
};

const appReducer = (state = initialState, action) => {
  switch (action.type) {
    case "SET_PRESENTATIONS":
      return { ...state, presentations: action.payload };
    case "SET_SLIDES":
      return { ...state, slides: action.payload };
    case "SET_ELEMENTS":
      return { ...state, elements: action.payload };
    default:
      return state;
  }
};

export const store = configureStore({
  reducer: {
    app: appReducer
  }
});