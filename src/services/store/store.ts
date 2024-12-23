import { combineReducers, configureStore } from "@reduxjs/toolkit";
import {
  TypedUseSelectorHook,
  useDispatch as dispatchHook,
  useSelector as selectorHook,
} from "react-redux";
import userReducer from "../../features/userSlice/userSlice";
import eventsReducer from "../../features/eventsSlice/eventsSlice";
import bioReducer from "../../features/bioSlice/bioSlice";
import mediaReducer from "../../features/mediaSlice/mediaSlice";
import galleryReducer from "../../features/gallerySlice/gallerySlice";

export const rootReducer = combineReducers({
  user: userReducer,
  events: eventsReducer,
  bio: bioReducer,
  media: mediaReducer,
  gallery: galleryReducer,
});

const store = configureStore({
  reducer: rootReducer,
  devTools: process.env.NODE_ENV === "development",
});

export type RootState = ReturnType<typeof rootReducer>;
export type AppDispatch = typeof store.dispatch;

export const useDispatch: () => AppDispatch = () => dispatchHook<AppDispatch>();
export const useSelector: TypedUseSelectorHook<RootState> = selectorHook;

export default store;
