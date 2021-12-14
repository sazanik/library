import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
import type { AppDispatch, RootState } from './store';
import { authorsSelectors, booksSelectors, store } from './store';
import { useContext } from 'react';
import { IAuthContext, IAuthor, IBook } from '../types/inerfaces';
import { AuthContext } from '../context/Auth/AuthProvider';

export const useAppDispatch = (): AppDispatch => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

export const useAllAuthors = (): IAuthor[] =>
  authorsSelectors.selectAll(store.getState());

export const useAllBooks = (): IBook[] =>
  booksSelectors.selectAll(store.getState());

export const useAuth = (): IAuthContext => {
  return useContext(AuthContext);
};
