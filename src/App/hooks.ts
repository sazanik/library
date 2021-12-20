import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
import type { AppDispatch, RootState } from './store';
import { authorsSelectors, booksSelectors, store } from './store';
import { useContext } from 'react';
import { AuthorProps, AuthProps, BookProps } from '../types/inerfaces';
import { AuthContext } from '../context/Auth/AuthProvider';

export const useAppDispatch = (): AppDispatch => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

export const useAllAuthors = (): AuthorProps[] =>
  authorsSelectors.selectAll(store.getState());

export const useAllBooks = (): BookProps[] =>
  booksSelectors.selectAll(store.getState());

export const useAuth = (): AuthProps => {
  return useContext(AuthContext);
};
