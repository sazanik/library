import { configureStore } from '@reduxjs/toolkit';

// import logger from 'redux-logger';
//
import { appSlice } from './app/appSlice';
import { authSlice } from './auth/authSlice';
import { authorsSlice } from './authors/authorsSlice';
import { booksSlice } from './books/booksSlice';

export const store = configureStore({
  reducer: {
    app: appSlice.reducer,
    authors: authorsSlice.reducer,
    books: booksSlice.reducer,
    auth: authSlice.reducer,
  },
  // middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(logger),
  devTools: process.env.NODE_ENV !== 'production',
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
