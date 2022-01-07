import { Dispatch, SetStateAction } from 'react';

export interface AuthorProps {
  id: string;
  firstName: string;
  lastName: string;
  birthDate: string;
  country: string;
}

export interface BookProps {
  id: string;
  title: string;
  description: string;
  code: string;
  pagesCount: string;
  publishingYear: string;
  authorId: string;
  authorName: string;
}

export interface User {
  login: string;
  password: string;
}

export interface AuthContextProps {
  user: User | null;
  isRegistered: boolean;
  setIsRegistered: Dispatch<SetStateAction<boolean>>;
  signIn: (newUser: User, cb: () => void) => void;
  logOut: (cb: () => void) => void;
}

export interface AuthFormProps {
  login: string;
  password: string;
  confirmPassword?: string;
}

export interface Countries {
  code: string;
  label: string;
}
