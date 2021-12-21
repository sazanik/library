import { AuthorProps } from '../types/inerfaces';
import { authorsSelectors, store } from '../store/store';

export const useAllAuthors = (): AuthorProps[] =>
  authorsSelectors.selectAll(store.getState());
