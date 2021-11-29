import { Book } from './book';
import { Types } from '../features/authors/authorsSlice';

export type AuthorActions = {
  type: Types,
  payload: Author
}

export type Author = {
  firstName: string,
  lastName: string,
  birthDate: string | number,
  country: string,
  books?: Book[],
  id?: number
}
