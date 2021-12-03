import { createEntityAdapter, createSlice } from '@reduxjs/toolkit';
import { RootState, store } from "../../App/store";

export interface Book {
  id: string
  title: string
  description: string
  code: string,
  pagesCount: string,
  year: string,
  authorId: string,
  authorName: string

}

const booksAdapter = createEntityAdapter<Book>({
  selectId: book => book.id,
  sortComparer: (a, b) => a.title.localeCompare(b.title)
});

export const booksSlice = createSlice({
  name: 'books',
  initialState: booksAdapter.getInitialState(),
  reducers: {
    createBook: booksAdapter.addOne,
    updateBook: booksAdapter.updateOne,
    removeBook: booksAdapter.removeOne,
  }
});

const booksSelectors = booksAdapter.getSelectors<RootState>(state => state.books)

export const allBooks = booksSelectors.selectAll(store.getState())
export const { createBook, updateBook, removeBook } = booksSlice.actions;
export default booksSlice.reducer;
