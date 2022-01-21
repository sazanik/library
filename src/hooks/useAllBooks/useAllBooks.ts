import { booksSelectors, store } from '../../store/store';
import { BookProps } from '../../types/inerfaces';

export const useAllBooks = (): BookProps[] =>
  booksSelectors.selectAll(store.getState());
