export enum AuthorActionTypes {
  Add = 'authors/add',
  Edit = 'authors/edit',
  Remove = 'authors/remove',
}

export enum BookActionTypes {
  Add = 'books/add',
  Edit = 'books/edit',
  Remove = 'books/remove',
}

export type Country = {
  code: string;
  label: string;
}

export type AuthorActions = {
  type: AuthorActionTypes,
  payload: Author | AuthorData
}

export type BookActions = {
  type: BookActionTypes,
  payload: Book
}

export type Author = {
  firstName: string,
  lastName: string,
  birthDate: string | number,
  country: string,
  books?: Book[],
  id?: number
}

export type AuthorData = {
  firstName?: string,
  lastName?: string,
  birthDate?: string | number,
  country?: string,
  books?: Book[],
  id?: number
}

export type Book = {
  title: string,
  description: string,
  code: string,
  author: Author[],
  pagesCount: number,
  year: string
}

export type State = {
  authors: Author[],
  books: Book[]
}
