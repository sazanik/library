import { createEntityAdapter, createSlice } from '@reduxjs/toolkit';

import { UserProps } from '../../types/inerfaces';
import { signInUser, signOutUser, signUpUser } from './asyncActions';

interface extendedStateProps {
  isLoading: boolean;
  error?: null | string;
}

const extendedState: extendedStateProps = {
  isLoading: true,
  error: null,
};

const actions = [signInUser, signUpUser, signOutUser];

export const newAuthAdapter = createEntityAdapter<UserProps>({
  selectId: (user) => user.id,
});

export const newAuthSlice = createSlice({
  name: 'auth',
  initialState: newAuthAdapter.getInitialState(extendedState),
  reducers: {
    setIsAuthLoading: (state, action) => {
      const { payload: status } = action;
      state.isLoading = status;
    },
  },
  extraReducers: (builder) => {
    actions.forEach((func) => {
      builder.addCase(func.pending, (state) => {
        state.isLoading = true;
      });
    });
    actions.forEach((func) => {
      builder.addCase(func.rejected, (state, action) => {
        const { error } = action;
        state.isLoading = false;
        state.error = error.message;
      });
    });
    actions.forEach((func) => {
      builder.addCase(func.fulfilled, (state) => {
        state.isLoading = false;
        state.error = null;
      });
    });
  },
});

export const { setIsAuthLoading } = newAuthSlice.actions;
