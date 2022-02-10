import { createEntityAdapter, createSlice } from '@reduxjs/toolkit';
import { AuthError } from 'firebase/auth';

import { UserProps } from '../../types/inerfaces';
import { signInUser, signOutUser, signUpUser } from './actions';

interface extendedStateProps {
  loading: boolean;
  error: null | string;
}

const extendedState: extendedStateProps = {
  loading: false,
  error: null,
};

const actions = [signInUser, signUpUser, signOutUser];

export const usersAdapter = createEntityAdapter<UserProps>({
  selectId: (user) => user.id,
  sortComparer: (a, b) => a.email.localeCompare(b.email),
});

export const usersSlice = createSlice({
  name: 'users',
  initialState: usersAdapter.getInitialState(extendedState),
  reducers: {},
  extraReducers: (builder) => {
    actions.forEach((func) => {
      builder.addCase(func.pending, (state) => {
        state.loading = true;
      });
    });
    actions.forEach((func) => {
      builder.addCase(func.rejected, (state, action) => {
        const { payload: error } = action;
        state.loading = false;
        state.error = (error as AuthError).message as string;
      });
    });
    actions.forEach((func) => {
      builder.addCase(func.fulfilled, (state) => {
        state.loading = false;
        state.error = null;
      });
    });
  },
});
