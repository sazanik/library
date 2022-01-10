import { UserProps } from '../../types/inerfaces';
import { usersSelectors, store } from '../../store/store';

export const useAllUsers = (): UserProps[] =>
  usersSelectors.selectAll(store.getState());
