import { authorsSelectors } from '../../store/authors/selectors';
import { store } from '../../store/store';
import { AuthorProps } from '../../types/inerfaces';

export const useAllAuthors = (): AuthorProps[] =>
  authorsSelectors.selectAll(store.getState());
