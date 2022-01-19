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
    builder
      .addCase(createAuthor.pending, (state) => {
        state.loading = true;
      })
      .addCase(createAuthor.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(updateAuthor.pending, (state) => {
        state.loading = true;
      })
      .addCase(updateAuthor.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(removeAuthor.pending, (state) => {
        state.loading = true;
      })
      .addCase(removeAuthor.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(getAllAuthors.pending, (state) => {
        state.loading = true;
      })
      .addCase(getAllAuthors.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(createBook.pending, (state) => {
        state.loading = true;
      })
      .addCase(createBook.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(updateBook.pending, (state) => {
        state.loading = true;
      })
      .addCase(updateBook.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(removeBook.pending, (state) => {
        state.loading = true;
      })
      .addCase(removeBook.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(getAllBooks.pending, (state) => {
        state.loading = true;
      })
      .addCase(getAllBooks.fulfilled, (state) => {
        state.loading = false;
      });
  },
});

export const { setLoading, stopLoading, setError } = appSlice.actions;
