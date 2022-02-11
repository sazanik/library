import { createEntityAdapter, createSlice } from '@reduxjs/toolkit';
import { AuthError } from 'firebase/auth';

import { AuthorProps } from '../../types/inerfaces';
import {
  createAuthor,
  getAuthorsCollection,
  getAuthorsCollectionSize,
  removeAuthor,
  updateAuthor,
} from './asyncActions';

interface extendedStateProps {
  loading: boolean;
  error: null | string;
  page: number;
  collectionSize: number;
}

const extendedState: extendedStateProps = {
  loading: false,
  error: null,
  page: 0,
  collectionSize: 0,
};

const actions = [
  createAuthor,
  getAuthorsCollection,
  removeAuthor,
  updateAuthor,
];

export const authorsAdapter = createEntityAdapter<AuthorProps>({
  selectId: (author) => author.id,
  sortComparer: (a, b) => a.lastName.localeCompare(b.lastName),
});

export const authorsSlice = createSlice({
  name: 'authors',
  initialState: authorsAdapter.getInitialState(extendedState),
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
        state.error = (error as AuthError)?.message as string;
      });
    });
    builder
      .addCase(createAuthor.fulfilled, (state, action) => {
        const { payload: author } = action;
        authorsAdapter.addOne(state, <AuthorProps>author);
        state.loading = false;
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
        state.loading = false;
        state.error = null;
      })
      .addCase(removeAuthor.fulfilled, (state, action) => {
        const { payload: id } = action;
        authorsAdapter.removeOne(state, id);
        state.loading = false;
        state.error = null;
      })
      .addCase(getAuthorsCollection.fulfilled, (state, action) => {
        const { payload: authors } = action;
        authorsAdapter.setMany(state, authors);
        state.loading = false;
        state.error = null;
      })
      .addCase(getAuthorsCollectionSize.fulfilled, (state, action) => {
        const { payload: count } = action;
        state.collectionSize = count;
      });
  },
});

export const { setPage } = authorsSlice.actions;
