import { useAllBooks } from '../useAllBooks';
import { booksSelectors, store } from '../../../store/store';

describe('useAllBooks hook', () => {
  it('should be immutable', () => {
    expect(useAllBooks()).toEqual(booksSelectors.selectAll(store.getState()));
  });
});
