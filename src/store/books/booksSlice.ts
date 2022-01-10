import {
  createEntityAdapter,
  createSlice,
  EntityState,
} from '@reduxjs/toolkit';
import { BookProps } from '../../types/inerfaces';

export const booksAdapter = createEntityAdapter<BookProps>({
  selectId: (book) => book.id,
  sortComparer: (a, b) => a.title.localeCompare(b.title),
});

let books: EntityState<BookProps>;
const localData = localStorage.getItem('store');
if (localData) {
  books = JSON.parse(localData).books;
}

export const booksSlice = createSlice({
  name: 'books',
  initialState: booksAdapter.getInitialState(books!),
  reducers: {
    createBook: booksAdapter.addOne,
    updateBook: booksAdapter.updateOne,
    removeBook: booksAdapter.removeOne,
  },
});

export const { createBook, updateBook, removeBook } = booksSlice.actions;
