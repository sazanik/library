import { createSlice } from '@reduxjs/toolkit';

import {
  createAuthor,
  getAllAuthors,
  removeAuthor,
  updateAuthor,
} from '../authors/actions';
import {
  createBook,
  getAllBooks,
  removeBook,
  updateBook,
} from '../books/actions';
import { userAuth } from '../users/actions';

const actionFunctions = [
  createAuthor,
  getAllAuthors,
  removeAuthor,
  updateAuthor,
  createBook,
  getAllBooks,
  removeBook,
  updateBook,
  userAuth,
];

interface stateProps {
  loading: boolean;
  additionalError?: Error;
}

const initialState: stateProps = {
  loading: true,
};

export const appSlice = createSlice({
  name: 'app',
  initialState,
  reducers: {
    setError: (state, action) => {
      const { payload } = action;
      state.additionalError = payload;
    },
    setLoading: (state) => {
      state.loading = true;
    },
    stopLoading: (state) => {
      state.loading = false;
    },
  },
  extraReducers: (builder) => {
    actionFunctions.forEach((f) => {
      builder.addCase(f.pending, (state) => {
        state.loading = true;
      });
    });
    actionFunctions.forEach((f) => {
      builder.addCase(f.fulfilled, (state) => {
        state.loading = false;
      });
    });
  },
});

export const { setLoading, stopLoading, setError } = appSlice.actions;
