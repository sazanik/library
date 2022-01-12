import { configureStore } from '@reduxjs/toolkit';
import logger from 'redux-logger';
import { authorsAdapter, authorsSlice } from './authors/authorsSlice';
import { booksAdapter, booksSlice } from './books/booksSlice';
import { usersAdapter, usersSlice } from './users/usersSlice';

export const store = configureStore({
  reducer: {
    authors: authorsSlice.reducer,
    books: booksSlice.reducer,
    users: usersSlice.reducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(logger),
  devTools: process.env.NODE_ENV !== 'production',
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export const authorsSelectors = authorsAdapter.getSelectors<RootState>(
  (state) => state.authors
);

export const booksSelectors = booksAdapter.getSelectors<RootState>(
  (state) => state.books
);

export const usersSelectors = usersAdapter.getSelectors<RootState>(
  (state) => state.users
);
