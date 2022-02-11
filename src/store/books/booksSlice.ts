import { createEntityAdapter, createSlice } from '@reduxjs/toolkit';
import { AuthError } from 'firebase/auth';

import { BookProps } from '../../types/inerfaces';
import {
  createBook,
  getCollectionBooks,
  removeBook,
  updateBook,
} from './asyncActions';

export const booksAdapter = createEntityAdapter<BookProps>({
  selectId: (book) => book.id,
  sortComparer: (a, b) => a.title.localeCompare(b.title),
});

interface extendedStateProps {
  loading: boolean;
  error: null | string;
  page: number;
  count: number;
}

const extendedState: extendedStateProps = {
  loading: false,
  error: null,
  page: 0,
  count: 0,
};

const actions = [createBook, getCollectionBooks, removeBook, updateBook];

export const booksSlice = createSlice({
  name: 'books',
  initialState: booksAdapter.getInitialState(extendedState),
  reducers: {
    setPage: (state, action) => {
      const { payload: page } = action;
      state.page = page;
    },
  },
  extraReducers: (builder) => {
    actions.forEach((func) => {
      builder.addCase(func.pending, (state) => {
        state.loading = true;
      });
    });
    actions.forEach((func) => {
      builder.addCase(func.rejected, (state, action) => {
        const { payload: error } = action;
        state.loading = false;
        state.error = (error as AuthError).message as string;
      });
    });
    builder
      .addCase(createBook.fulfilled, (state, action) => {
        const { payload: book } = action;
        booksAdapter.addOne(state, <BookProps>book);
        state.loading = false;
        state.error = null;
      })
      .addCase(updateBook.fulfilled, (state, action) => {
        const { payload: book } = action;
        booksAdapter.updateOne(state, {
          id: book.id,
          changes: {
            ...book,
          },
        });
        state.loading = false;
        state.error = null;
      })
      .addCase(removeBook.fulfilled, (state, action) => {
        const { payload: id } = action;
        booksAdapter.removeOne(state, id);
        state.loading = false;
        state.error = null;
      })
      .addCase(getCollectionBooks.fulfilled, (state, action) => {
        const { books, fullCollectionCount } = action.payload;
        booksAdapter.setMany(state, books);
        state.count = fullCollectionCount;
        state.loading = false;
        state.error = null;
      });
  },
});

export const { setPage } = booksSlice.actions;
