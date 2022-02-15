import { store } from '../store/store';

export const checkLoading = (): boolean => {
  const { authors, books, users } = store.getState();
  return authors.loading || books.loading || users.loading;
};
