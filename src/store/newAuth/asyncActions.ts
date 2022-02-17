import { createAsyncThunk } from '@reduxjs/toolkit';

import { setToken } from '../../packages/api';
import { signIn } from '../../packages/api/rest/users/signIn';
import { signUp } from '../../packages/api/rest/users/signUp';

interface SignInParams {
  email: string;
  password: string;
}

interface SignUpProps extends SignInParams {
  username: string;
}

const sigInRequest = async ({ email, password }: SignInParams): Promise<void> => {
  const response = await signIn({
    user: {
      email,
      password,
    },
  });

  const token = response.data.token;
  setToken(token);
};

export const signInUser = createAsyncThunk('newAuth/signInUser', sigInRequest);

const sigUpRequest = async ({ username, email, password }: SignUpProps): Promise<void> => {
  const response = await signUp({
    user: {
      username,
      email,
      password,
    },
  });

  const token = response.data.token;
  setToken(token);
};

export const signUpUser = createAsyncThunk('newAuth/signUpUser', sigUpRequest);

const signOutRequest = async (): Promise<void> => {
  console.log('CLEAR SIGN OUT');
};

export const signOutUser = createAsyncThunk('newAuth/signOutUser', signOutRequest);
