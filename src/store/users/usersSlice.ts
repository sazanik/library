import { createEntityAdapter, createSlice } from '@reduxjs/toolkit';

import { UserProps } from '../../types/inerfaces';

export const usersAdapter = createEntityAdapter<UserProps>({
  selectId: (user) => user.id,
  sortComparer: (a, b) => a.email.localeCompare(b.email),
});

export const usersSlice = createSlice({
  name: 'users',
  initialState: usersAdapter.getInitialState(),
  reducers: {
    createUser: usersAdapter.addOne,
  },
});

export const { createUser } = usersSlice.actions;
