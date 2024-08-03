import { configureStore } from '@reduxjs/toolkit';
import searchReducer from '../features/searchReducer';
import commentsReducer from "../features/userCommentSlice";

export const store = configureStore({
  reducer: {
    search: searchReducer,
    comments: commentsReducer,
  },
});
