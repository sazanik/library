import { createEntityAdapter, createSlice } from '@reduxjs/toolkit';

import { AuthorProps } from '../../types/inerfaces';
import {
  createAuthor,
  getAllAuthors,
  removeAuthor,
  updateAuthor,
} from './actions';

export const authorsAdapter = createEntityAdapter<AuthorProps>({
  selectId: (author) => author.id,
  sortComparer: (a, b) => a.lastName.localeCompare(b.lastName),
});

export const authorsSlice = createSlice({
  name: 'authors',
  initialState: authorsAdapter.getInitialState(),
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(createAuthor.fulfilled, (state, action) => {
        const { payload: author } = action;
        authorsAdapter.addOne(state, <AuthorProps>author);
      })
      .addCase(updateAuthor.fulfilled, (state, action) => {
        const { payload: author } = action;
        if (author) {
          authorsAdapter.updateOne(state, {
            id: author.id,
            changes: {
              ...author,
            },
          });
        }
      })
      .addCase(removeAuthor.fulfilled, (state, action) => {
        const { payload: id } = action;
        if (id) {
          authorsAdapter.removeOne(state, id);
        }
      })
      .addCase(getAllAuthors.fulfilled, (state, action) => {
        const { payload: authors } = action;
        authorsAdapter.setAll(state, authors);
      });
  },
});
