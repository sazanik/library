import { Book } from "./book";
import { Author } from "./author";
import { AuthorTypes, BookTypes } from "./enums";

export type AuthorActions = {
  type: AuthorTypes
  payload: Author
}

export type BooksActions = {
  type: BookTypes
  payload: Book
}


