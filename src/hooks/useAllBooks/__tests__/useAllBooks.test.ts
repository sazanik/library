import { booksSelectors, store } from '../../../store/store';
import { useAllBooks } from '../useAllBooks';

describe('useAllBooks hook', () => {
  it('should be immutable', () => {
    expect(useAllBooks()).toEqual(booksSelectors.selectAll(store.getState()));
  });
});
