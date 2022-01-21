import { authorsSelectors, store } from '../../store/store';
import { AuthorProps } from '../../types/inerfaces';

export const useAllAuthors = (): AuthorProps[] =>
  authorsSelectors.selectAll(store.getState());
