import { store } from '../../store/store';
import { usersSelectors } from '../../store/users/selectors';
import { UserProps } from '../../types/inerfaces';

export const useAllUsers = (): UserProps[] =>
  usersSelectors.selectAll(store.getState());
