import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
import type { RootState, AppDispatch } from './store';
import { IAuthor } from '../features/authors/authorsSlice';
import { authorsSelectors, booksSelectors, store } from './store';
import { IBook } from '../features/books/booksSlice';

export const useAppDispatch = (): AppDispatch => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

export const useAllAuthors = (): IAuthor[] =>
  authorsSelectors.selectAll(store.getState());
export const useAllBooks = (): IBook[] =>
  booksSelectors.selectAll(store.getState());
