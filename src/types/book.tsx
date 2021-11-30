import { BookTypes } from "../features/authors/authorsSlice";

export type BookActions = {
  type: BookTypes
  payload: Book
}

export type Book = {
  title: string,
  description: string,
  code: string,
  pagesCount: string,
  year: string,
  id: string,
  authorName: string,
  authorId: string,
}



