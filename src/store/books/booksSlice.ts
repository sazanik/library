import { createEntityAdapter, createSlice } from '@reduxjs/toolkit';

import { BookProps } from '../../types/inerfaces';
import { createBook, getAllBooks, removeBook, updateBook } from './actions';

export const booksAdapter = createEntityAdapter<BookProps>({
  selectId: (book) => book.id,
  sortComparer: (a, b) => a.title.localeCompare(b.title),
});

export const booksSlice = createSlice({
  name: 'books',
  initialState: booksAdapter.getInitialState(),
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(createBook.fulfilled, (state, action) => {
        const { payload: book } = action;
        booksAdapter.addOne(state, <BookProps>book);
      })
      .addCase(updateBook.fulfilled, (state, action) => {
        const { payload: book } = action;
        booksAdapter.updateOne(state, {
          id: book.id,
          changes: {
            ...book,
          },
        });
      })
      .addCase(removeBook.fulfilled, (state, action) => {
        const { payload: id } = action;
        booksAdapter.removeOne(state, id);
      })
      .addCase(getAllBooks.fulfilled, (state, action) => {
        const { payload: books } = action;
        booksAdapter.setAll(state, books);
      });
  },
});
