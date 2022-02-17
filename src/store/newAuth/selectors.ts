import { RootState } from '../store';
import { newAuthAdapter } from './newAuthSlice';

export const newAuthSelectors = newAuthAdapter.getSelectors<RootState>((state) => state.newAuth);
