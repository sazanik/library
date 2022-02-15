import { Localization } from '@mui/material/locale';
import { Dispatch, SetStateAction } from 'react';

import { Locales } from './enums';

export interface UserProps {
  id: string;
  email: string;
  token: string;
}

export interface AuthorProps {
  id: string;
  firstName: string;
  lastName: string;
  birthDate: string;
  country: string;
}

export interface AuthorFormProps {
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
}

export interface BookFormProps {
  title: string;
  description: string;
  code: string;
  pagesCount: string;
  publishingYear: string;
  authorId: string;
}

export interface AuthContextProps {
  token: string | null;
  isRegistered: boolean;
  setIsRegistered: Dispatch<SetStateAction<boolean>>;
  signIn: (token: string, cb: () => void) => void;
  logOut: () => void;
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

export type PaginationLocales = {
  [key in Locales]: Localization;
};

export type FieldsList =
  | 'firstName'
  | 'lastName'
  | 'birthDate'
  | 'country'
  | 'books'
  | 'title'
  | 'description'
  | 'code'
  | 'authorName'
  | 'pagesCount'
  | 'publishingYear'
  | 'editing';

export type Sort = 'asc' | 'desc' | undefined;

export interface ServerSortedRowsParams {
  field: FieldsList;
  pageSize: number;
  page: number;
  sort: Sort;
}
