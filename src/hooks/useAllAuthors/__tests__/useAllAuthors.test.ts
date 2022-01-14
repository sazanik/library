import { useAllAuthors } from '../useAllAuthors';
import { authorsSelectors, store } from '../../../store/store';

describe('useAllAuthors hook', () => {
  it('should be immutable', () => {
    expect(useAllAuthors()).toEqual(
      authorsSelectors.selectAll(store.getState())
    );
  });
});
