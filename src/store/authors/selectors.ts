import { RootState } from '../store';
import { authorsAdapter } from './authorsSlice';

export const authorsSelectors = authorsAdapter.getSelectors<RootState>((state) => state.authors);
