import { GridSortModel } from '@mui/x-data-grid';
import { createEntityAdapter, createSlice } from '@reduxjs/toolkit';
import { AuthError } from 'firebase/auth';

import { BookProps } from '../../types/inerfaces';
import {
  createBook,
  getBooksCollection,
  getBooksCollectionSize,
  getBooksSortedCollection,
  removeBook,
  updateBook,
} from './asyncActions';

export const booksAdapter = createEntityAdapter<BookProps>({
  selectId: (book) => book.id,
});

interface extendedStateProps {
  isLoading: boolean;
  error: null | string;
  page: number;
  collectionSize: number;
  sortedList: BookProps[];
  sortModel: GridSortModel;
}

const extendedState: extendedStateProps = {
  isLoading: true,
  error: null,
  page: 0,
  collectionSize: 0,
  sortedList: [],
  sortModel: [
    {
      field: 'title',
      sort: null,
    },
  ],
};

const actions = [
  createBook,
  getBooksCollection,
  getBooksCollectionSize,
  getBooksSortedCollection,
  removeBook,
  updateBook,
];

export const booksSlice = createSlice({
  name: 'books',
  initialState: booksAdapter.getInitialState(extendedState),
  reducers: {
    setBooksPage: (state, action) => {
      const { payload: page } = action;
      state.page = page;
    },
  },
  extraReducers: (builder) => {
    actions.forEach((func) => {
      builder.addCase(func.pending, (state) => {
        state.isLoading = true;
      });
    });
    actions.forEach((func) => {
      builder.addCase(func.rejected, (state, action) => {
        const { payload: error } = action;
        state.isLoading = false;
        state.error = (error as AuthError)?.message as string;
      });
    });
    builder
      .addCase(createBook.fulfilled, (state, action) => {
        const { payload: book } = action;
        booksAdapter.addOne(state, <BookProps>book);
        state.isLoading = false;
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
        state.isLoading = false;
        state.error = null;
      })
      .addCase(removeBook.fulfilled, (state, action) => {
        const { payload: id } = action;
        booksAdapter.removeOne(state, id);
        state.isLoading = false;
        state.error = null;
      })
      .addCase(getBooksCollection.fulfilled, (state, action) => {
        const { payload: books } = action;
        booksAdapter.setMany(state, books);
        state.isLoading = false;
        state.error = null;
      })
      .addCase(getBooksCollectionSize.fulfilled, (state, action) => {
        const { payload: count } = action;
        state.collectionSize = count;
        state.isLoading = false;
        state.error = null;
      })
      .addCase(getBooksSortedCollection.fulfilled, (state, action) => {
        const { sortedList, sortModel } = action.payload;
        state.sortedList = sortedList as BookProps[];
        state.sortModel = [sortModel];
        state.isLoading = false;
        state.error = null;
      });
  },
});

export const { setBooksPage } = booksSlice.actions;
