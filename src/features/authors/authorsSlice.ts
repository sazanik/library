import { createEntityAdapter, createSlice } from '@reduxjs/toolkit';
import { RootState, store } from "../../App/store";

export interface Author {
  id: string
  firstName: string,
  lastName: string,
  birthDate: string,
  country: string,
  books: string[]
}

const authorsAdapter = createEntityAdapter<Author>({
  selectId: author => author.id,
  sortComparer: (a, b) => a.lastName.localeCompare(b.lastName)
});

export const authorsSlice = createSlice({
  name: 'authors',
  initialState: authorsAdapter.getInitialState(),
  reducers: {
    createAuthor: authorsAdapter.addOne,
    updateAuthor: authorsAdapter.updateOne,
    removeAuthor: authorsAdapter.removeOne,
  }
});

const authorsSelectors = authorsAdapter.getSelectors<RootState>(state => state.authors)

export const allAuthors = authorsSelectors.selectAll(store?.getState())
export const { createAuthor, updateAuthor, removeAuthor } = authorsSlice.actions;
export default authorsSlice.reducer;
