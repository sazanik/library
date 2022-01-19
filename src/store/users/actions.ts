import { Auth } from '@firebase/auth/dist/node-esm';
import { createAsyncThunk } from '@reduxjs/toolkit';
import {
  AuthError,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from 'firebase/auth';

import { setError } from '../app/appSlice';
import { store } from '../store';

interface Props {
  auth: Auth;
  email: string;
  password: string;
  isRegistered: boolean;
}

const authRequest = async ({
  auth,
  email,
  password,
  isRegistered,
}: Props): Promise<void> => {
  const userAuth = isRegistered
    ? signInWithEmailAndPassword
    : createUserWithEmailAndPassword;

  try {
    await userAuth(auth, email, password);
  } catch (error) {
    store.dispatch(setError((error as AuthError).code as string));
  }
};

export const userAuth = createAsyncThunk('users/userAuth', authRequest);
