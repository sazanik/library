import { store, usersSelectors } from '../../store/store';
import { UserProps } from '../../types/inerfaces';

export const useAllUsers = (): UserProps[] =>
  usersSelectors.selectAll(store.getState());
