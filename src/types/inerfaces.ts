import React from 'react';

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
  repeatPassword?: string;
}

export interface IAuthContext {
  user: IUser | null;
  isRegistered: boolean;
  setIsRegistered: React.Dispatch<React.SetStateAction<boolean>>;
  signIn: (newUser: IUser, cb: () => void) => void;
  signOut: (newUser: IUser, cb: () => void) => void;
}
