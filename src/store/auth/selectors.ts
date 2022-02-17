import { RootState } from '../store';
import { authAdapter } from './authSlice';

export const authSelectors = authAdapter.getSelectors<RootState>((state) => state.auth);
