import { configureStore } from '@reduxjs/toolkit';
import {
  Author,
  authorsAdapter,
  authorsSlice,
} from '../features/authors/authorsSlice';
import { Book, booksAdapter, booksSlice } from '../features/books/booksSlice';

export const store = configureStore({
  reducer: {
    authors: authorsSlice.reducer,
    books: booksSlice.reducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export const authorsSelectors = authorsAdapter.getSelectors<RootState>(
  (state) => state.authors
);
export const useAllAuthors = (): Author[] =>
  authorsSelectors.selectAll(store.getState());

export const booksSelectors = booksAdapter.getSelectors<RootState>(
  (state) => state.books
);
export const useAllBooks = (): Book[] =>
  booksSelectors.selectAll(store.getState());