import { Author } from "../../types/author";
import { AuthorTypes, BookTypes } from "../../types/enums";
import { Book } from "../../types/book";
import { AuthorActions, BooksActions } from "../../types/actions";

const initialState: Author[] = [];

export const libraryReducer = (state = initialState, action: any): Author[] => {
  const {type, payload} = action;
  const cloneState = [...state];
  switch (type) {
    case AuthorTypes.Create:
      return [
        ...state,
        payload,
      ];

    case AuthorTypes.Edit: {
      const newState = [...state.filter(author => author.id !== payload.id), payload];
      const author: Author | undefined = newState.find((author) => author.id === payload.id);
      author?.books.forEach((book: Book) => book.authorName = author?.firstName + ' ' + author?.lastName);
      return newState;
    }

    case AuthorTypes.Delete:
      return state.filter(author => author.id !== payload.id);

    case BookTypes.Create:
      cloneState.find(author => author.id === payload?.authorId)?.books?.push(payload);
      return cloneState;

    case BookTypes.Edit: {

      cloneState.forEach((author: Author) => {
        const updateBooks: Book[] = [];
        let result = author?.books?.filter((book: Book) => book.id !== payload.id);
        updateBooks.push(...result);
        author.books = updateBooks;
      });
      const author: Author | undefined = cloneState.find((author: Author) => author.id === payload.authorId);
      author?.books?.push(payload);
      return cloneState;
    }

    case BookTypes.Delete: {
      const author: any = cloneState.find((author: Author) => author.id === payload.authorId);
      const updatedBooks: Book[] = author.books.filter((book: Book) => book.id !== payload.id);
      author.books = [...updatedBooks];
      return cloneState;
    }


    default:
      return state;
  }
};

export const actions = {
  createAuthor: (newAuthor: Author): AuthorActions => ({type: AuthorTypes.Create, payload: newAuthor}),
  editAuthor: (author: Author): AuthorActions => ({type: AuthorTypes.Edit, payload: author}),
  deleteAuthor: (author: Author): AuthorActions => ({type: AuthorTypes.Delete, payload: author}),


  createBook: (newBook: Book): BooksActions => ({type: BookTypes.Create, payload: newBook}),
  editBook: (book: Book): BooksActions => ({type: BookTypes.Edit, payload: book}),
  deleteBook: (book: Book): BooksActions => ({type: BookTypes.Delete, payload: book}),
};

export const selectLibrary = (state: { library: Author[] }): Author[] => state.library;
