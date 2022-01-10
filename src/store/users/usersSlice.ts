import {
  createEntityAdapter,
  createSlice,
  EntityState,
} from '@reduxjs/toolkit';
import { UserProps } from '../../types/inerfaces';

export const usersAdapter = createEntityAdapter<UserProps>({
  selectId: (user) => user.id,
  sortComparer: (a, b) => a.email.localeCompare(b.email),
});

let users: EntityState<UserProps>;
const localData = localStorage.getItem('store');
if (localData) {
  users = JSON.parse(localData).users;
}

export const usersSlice = createSlice({
  name: 'users',
  initialState: usersAdapter.getInitialState(users!),
  reducers: {
    createUser: usersAdapter.addOne,
  },
});

export const { createUser } = usersSlice.actions;
