import { Types } from '../features/books/booksSlice';

export type BookActions = {
  type: Types,
  payload: Book
}

export type Book = {
  title: string,
  description: string,
  code: string,
  pagesCount: string,
  year: string,
  id?: string,
  authorName: string,
  authorId?: string,
}



