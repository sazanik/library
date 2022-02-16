import { RootState } from '../store';
import { usersAdapter } from './usersSlice';

export const usersSelectors = usersAdapter.getSelectors<RootState>((state) => state.users);
