import { Dispatch, SetStateAction } from 'react';

export interface IAuthor {
  id: string;
  firstName: string;
  lastName: string;
  birthDate: string;
  country: string;
}

export interface IBook {
  id: string;
  title: string;
  description: string;
  code: string;
  pagesCount: string;
  publishingYear: string;
  authorId: string;
  authorName: string;
}

export interface IUser {
  login: string;
  password: string;
}

export interface IAuthContext {
  user: IUser | null;
  isRegistered: boolean;
  setIsRegistered: Dispatch<SetStateAction<boolean>>;
  signIn: (newUser: IUser, cb: () => void) => void;
  logOut: (cb: () => void) => void;
}
