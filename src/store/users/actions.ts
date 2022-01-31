import { Auth } from '@firebase/auth/dist/node-esm';
import { createAsyncThunk } from '@reduxjs/toolkit';
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from 'firebase/auth';

import { auth as authObject } from '../../firebase';

interface Props {
  auth: Auth;
  email: string;
  password: string;
}

const sigInRequest = async ({
  auth,
  email,
  password,
}: Props): Promise<void> => {
  await signInWithEmailAndPassword(auth, email, password);
};

const sigUpRequest = async ({
  auth,
  email,
  password,
}: Props): Promise<void> => {
  await createUserWithEmailAndPassword(auth, email, password);
};

const signOutRequest = (): Promise<void> => authObject.signOut();

export const signInUser = createAsyncThunk('users/signInUser', sigInRequest);
export const signUpUser = createAsyncThunk('users/signUpUser', sigUpRequest);
export const signOutUser = createAsyncThunk(
  'users/signOutUser',
  signOutRequest
);
