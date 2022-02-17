import { store } from '../store/store';

export const checkLoading = (): boolean => {
  const { authors, books, auth } = store.getState();
  return authors.isLoading || books.isLoading || auth.isLoading;
};
