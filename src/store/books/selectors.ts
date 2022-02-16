import { RootState } from '../store';
import { booksAdapter } from './booksSlice';

export const booksSelectors = booksAdapter.getSelectors<RootState>((state) => state.books);
