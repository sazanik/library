import { GridSortModel } from '@mui/x-data-grid';
import { createEntityAdapter, createSlice } from '@reduxjs/toolkit';
import { AuthError } from 'firebase/auth';

import { AuthorProps } from '../../types/inerfaces';
import {
  createAuthor,
  getAuthorsCollection,
  getAuthorsCollectionSize,
  getAuthorsSortedCollection,
  removeAuthor,
  updateAuthor,
} from './asyncActions';

interface extendedStateProps {
  isLoading: boolean;
  error: null | string;
  page: number;
  collectionSize: number;
  sortedList: AuthorProps[];
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
      field: 'firstName',
      sort: null,
    },
  ],
};

const actions = [
  createAuthor,
  getAuthorsCollection,
  getAuthorsCollectionSize,
  getAuthorsSortedCollection,
  removeAuthor,
  updateAuthor,
];

export const authorsAdapter = createEntityAdapter<AuthorProps>({
  selectId: (author) => author.id,
});

export const authorsSlice = createSlice({
  name: 'authors',
  initialState: authorsAdapter.getInitialState(extendedState),
  reducers: {
    setAuthorsPage: (state, action) => {
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
      .addCase(createAuthor.fulfilled, (state, action) => {
        const { payload: author } = action;
        authorsAdapter.addOne(state, <AuthorProps>author);
        state.isLoading = false;
        state.error = null;
      })
      .addCase(updateAuthor.fulfilled, (state, action) => {
        const { payload: author } = action;
        authorsAdapter.updateOne(state, {
          id: author.id,
          changes: {
            ...author,
          },
        });
        state.isLoading = false;
        state.error = null;
      })
      .addCase(removeAuthor.fulfilled, (state, action) => {
        const { payload: id } = action;
        authorsAdapter.removeOne(state, id);
        state.isLoading = false;
        state.error = null;
      })
      .addCase(getAuthorsCollection.fulfilled, (state, action) => {
        const { payload: authors } = action;
        authorsAdapter.setMany(state, authors);
        state.isLoading = false;
        state.error = null;
      })
      .addCase(getAuthorsCollectionSize.fulfilled, (state, action) => {
        const { payload: count } = action;
        state.collectionSize = count;
        state.isLoading = false;
        state.error = null;
      })
      .addCase(getAuthorsSortedCollection.fulfilled, (state, action) => {
        const { sortedList, sortModel } = action.payload;
        state.sortedList = sortedList as AuthorProps[];
        state.sortModel = [sortModel];
        state.isLoading = false;
        state.error = null;
      });
  },
});

export const { setAuthorsPage } = authorsSlice.actions;
