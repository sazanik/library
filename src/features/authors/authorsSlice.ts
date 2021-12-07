import { createEntityAdapter, createSlice } from '@reduxjs/toolkit';

export interface Author {
  id: string;
  firstName: string;
  lastName: string;
  birthDate: string;
  country: string;
}

export const authorsAdapter = createEntityAdapter<Author>({
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
});

export const { createAuthor, updateAuthor, removeAuthor } =
  authorsSlice.actions;
