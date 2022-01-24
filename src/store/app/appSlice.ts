import { createSlice } from '@reduxjs/toolkit';
import { AuthError } from 'firebase/auth';

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
import { signInUser, signUpUser } from '../users/actions';

const actionFunctions = [
  createAuthor,
  getAllAuthors,
  removeAuthor,
  updateAuthor,
  createBook,
  getAllBooks,
  removeBook,
  updateBook,
  signInUser,
  signUpUser,
];

interface stateProps {
  loading: boolean;
  additionalError: string | null;
}

const initialState: stateProps = {
  loading: true,
  additionalError: null,
};

export const appSlice = createSlice({
  name: 'app',
  initialState,
  reducers: {
    setLoading: (state) => {
      state.loading = true;
    },
    stopLoading: (state) => {
      state.loading = false;
    },
    setError: (state, action) => {
      state.additionalError = action.payload;
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
        state.additionalError = null;
      });
    });
    actionFunctions.forEach((f) => {
      builder.addCase(f.rejected, (state, action) => {
        state.additionalError = (action.error as AuthError).message as string;
        state.loading = false;
      });
    });
  },
});

export const { setLoading, stopLoading, setError } = appSlice.actions;
