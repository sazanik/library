import { Book } from './book';
import { AuthorTypes } from "../features/authors/authorsSlice";

export type AuthorActions = {
  type: AuthorTypes
  payload: Author
}

export type Author = {
  firstName: string,
  lastName: string,
  birthDate: string,
  country: string,
  books: Book[],
  id: string
}
