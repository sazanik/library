import { createEntityAdapter, createSlice } from '@reduxjs/toolkit';

import { AuthorProps } from '../../types/inerfaces';
import { bdCreateAuthor, bdGetAllAuthors, bdUpdateAuthor } from './actions';

export const authorsAdapter = createEntityAdapter<AuthorProps>({
  selectId: (author) => author.id,
  sortComparer: (a, b) => a.lastName.localeCompare(b.lastName),
});

export const authorsSlice = createSlice({
  name: 'authors',
  initialState: authorsAdapter.getInitialState(),
  reducers: {
    createAuthor: authorsAdapter.addOne,
    updateAuthor: authorsAdapter.updateOne,
    removeAuthor: authorsAdapter.removeOne,
  },
  extraReducers: (builder) => {
    builder
      .addCase(bdCreateAuthor.fulfilled, (state, action) => {
        const { payload } = action;
        if (payload) {
          authorsAdapter.addOne(state, payload);
        }
      })
      .addCase(bdUpdateAuthor.fulfilled, (state, action) => {
        const { payload } = action;
        if (payload) {
          authorsAdapter.updateOne(state, {
            id: payload.id,
            changes: {
              ...payload,
            },
          });
        }
      })
      .addCase(bdGetAllAuthors.fulfilled, (state, action) => {
        const { payload } = action;
        authorsAdapter.setAll(state, payload);
      });
  },
});

export const { createAuthor, updateAuthor, removeAuthor } =
  authorsSlice.actions;
