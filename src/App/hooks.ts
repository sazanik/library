import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
import type { RootState, AppDispatch } from './store';
import { Author } from '../features/authors/authorsSlice';
import { authorsSelectors, booksSelectors, store } from './store';
import { Book } from '../features/books/booksSlice';

export const useAppDispatch = (): AppDispatch => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

export const useAllAuthors = (): Author[] =>
  authorsSelectors.selectAll(store.getState());
export const useAllBooks = (): Book[] =>
  booksSelectors.selectAll(store.getState());
