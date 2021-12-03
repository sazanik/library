import { configureStore } from "@reduxjs/toolkit";
import authorsReducer from "../features/authors/authorsSlice";
import booksReducer from "../features/books/booksSlice";

export const store = configureStore({
  reducer: {
    books: booksReducer,
    authors: authorsReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch;
