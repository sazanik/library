import { authorsSelectors, store } from '../../../store/store';
import { useAllAuthors } from '../useAllAuthors';

describe('useAllAuthors hook', () => {
  it('should be immutable', () => {
    expect(useAllAuthors()).toEqual(
      authorsSelectors.selectAll(store.getState())
    );
  });
});
