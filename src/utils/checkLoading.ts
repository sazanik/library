import { store } from '../store/store';

export const checkLoading = (): boolean => {
  const { authors, books, users } = store.getState();
  return authors.isLoading || books.isLoading || users.isLoading;
};
