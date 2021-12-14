import {
  createEntityAdapter,
  createSlice,
  EntityState,
} from '@reduxjs/toolkit';

export interface IAuthor {
  id: string;
  firstName: string;
  lastName: string;
  birthDate: string;
  country: string;
}

export const authorsAdapter = createEntityAdapter<IAuthor>({
  selectId: (author) => author.id,
  sortComparer: (a, b) => a.lastName.localeCompare(b.lastName),
});

let authors: EntityState<IAuthor>;
const localData = localStorage.getItem('store');
if (localData) {
  authors = JSON.parse(localData).authors;
}

export const authorsSlice = createSlice({
  name: 'authors',
  initialState: authorsAdapter.getInitialState(authors!),
  reducers: {
    createAuthor: authorsAdapter.addOne,
    updateAuthor: authorsAdapter.updateOne,
    removeAuthor: authorsAdapter.removeOne,
  },
});

export const { createAuthor, updateAuthor, removeAuthor } =
  authorsSlice.actions;
