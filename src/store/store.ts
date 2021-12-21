import { configureStore } from '@reduxjs/toolkit';
import { authorsAdapter, authorsSlice } from './authors/authorsSlice';
import { booksAdapter, booksSlice } from './books/booksSlice';

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

export const booksSelectors = booksAdapter.getSelectors<RootState>(
  (state) => state.books
);
