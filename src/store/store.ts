import { configureStore } from '@reduxjs/toolkit';
import logger from 'redux-logger';

import { appSlice } from './app/appSlice';
import { authorsSlice } from './authors/authorsSlice';
import { booksSlice } from './books/booksSlice';
import { usersSlice } from './users/usersSlice';

export const store = configureStore({
  reducer: {
    app: appSlice.reducer,
    authors: authorsSlice.reducer,
    books: booksSlice.reducer,
    users: usersSlice.reducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(logger),
  devTools: process.env.NODE_ENV !== 'production',
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
