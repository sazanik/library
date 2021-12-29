import { BookProps } from '../../types/inerfaces';
import { booksSelectors, store } from '../../store/store';

export const useAllBooks = (): BookProps[] =>
  booksSelectors.selectAll(store.getState());
