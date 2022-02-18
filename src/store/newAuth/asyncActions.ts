import { createAsyncThunk } from '@reduxjs/toolkit';

import { signIn } from '../../packages/api/rest/auth/signIn';
import { signUp } from '../../packages/api/rest/auth/signUp';

interface SignInParams {
  email: string;
  password: string;
}

interface SignUpProps extends SignInParams {
  username: string;
}

const sigInRequest = async ({ email, password }: SignInParams): Promise<string | null> => {
  const response = await signIn({
    user: {
      email,
      password,
    },
  });
  return response.data.user.token;
};

export const signInUser = createAsyncThunk('newAuth/signInUser', sigInRequest);

const sigUpRequest = async ({ username, email, password }: SignUpProps): Promise<string | null> => {
  const response = await signUp({
    user: {
      username,
      email,
      password,
    },
  });

  return response.data.user.token;
};

export const signUpUser = createAsyncThunk('newAuth/signUpUser', sigUpRequest);
