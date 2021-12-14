import {
  createEntityAdapter,
  createSlice,
  EntityState,
} from '@reduxjs/toolkit';
import { IBook } from '../../types/inerfaces';

export const booksAdapter = createEntityAdapter<IBook>({
  selectId: (book) => book.id,
  sortComparer: (a, b) => a.title.localeCompare(b.title),
});

let books: EntityState<IBook>;
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
