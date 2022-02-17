import { Auth } from '@firebase/auth/dist/node-esm';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth';

import { auth as authObject } from '../../firebase';

interface Props {
  auth: Auth;
  email: string;
  password: string;
}

const sigInRequest = async ({ auth, email, password }: Props): Promise<void> => {
  await signInWithEmailAndPassword(auth, email, password);
};

export const signInUser = createAsyncThunk('auth/signInUser', sigInRequest);

const sigUpRequest = async ({ auth, email, password }: Props): Promise<void> => {
  await createUserWithEmailAndPassword(auth, email, password);
};

export const signUpUser = createAsyncThunk('auth/signUpUser', sigUpRequest);

const signOutRequest = (): Promise<void> => authObject.signOut();

export const signOutUser = createAsyncThunk('auth/signOutUser', signOutRequest);
