import { createEntityAdapter, createSlice } from '@reduxjs/toolkit';

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

export const booksSlice = createSlice({
  name: 'books',
  initialState: booksAdapter.getInitialState(),
  reducers: {
    createBook: booksAdapter.addOne,
    updateBook: booksAdapter.updateOne,
    removeBook: booksAdapter.removeOne,
  },
});

export const { createBook, updateBook, removeBook } = booksSlice.actions;
