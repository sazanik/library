import {
  createEntityAdapter,
  createSlice,
  EntityState,
} from '@reduxjs/toolkit';

export interface Book {
  id: string;
  title: string;
  description: string;
  code: string;
  pagesCount: string;
  publishingYear: string;
  authorId: string;
  authorName: string;
}

export const booksAdapter = createEntityAdapter<Book>({
  selectId: (book) => book.id,
  sortComparer: (a, b) => a.title.localeCompare(b.title),
});

let books: EntityState<Book>;
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
