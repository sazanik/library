import { Author } from './author';
import { Types } from '../features/books/booksSlice';

export type BookActions = {
  type: Types,
  payload: Book
}

export type Book = {
  title: string,
  description: string,
  code: string,
  author: Author[],
  pagesCount: number,
  year: string
}



