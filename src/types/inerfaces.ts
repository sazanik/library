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

export interface UserProps {
  id: string;
  email: string;
  token: string;
}

export interface AuthContextProps {
  token: string | null;
  isRegistered: boolean;
  setIsRegistered: Dispatch<SetStateAction<boolean>>;
  signIn: (token: string, cb: () => void) => void;
  logOut: (cb: () => void) => void;
}

export interface AuthFormProps {
  email: string;
  password: string;
  confirmPassword?: string;
}

export interface Countries {
  code: string;
  label: string;
}
