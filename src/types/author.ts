import { Book } from './book';

export type Author = {
  firstName: string,
  lastName: string,
  birthDate: string,
  country: string,
  books: Book[],
  id: string
}
