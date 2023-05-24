import { createWrapper } from "next-redux-wrapper";
const { configureStore, combineReducers } = require("@reduxjs/toolkit");
const reducers = combineReducers({});

const store = configureStore({
  reducer: reducers,
});

export const wrapper = createWrapper(() => store);
