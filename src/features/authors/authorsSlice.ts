import { Author, AuthorActions } from '../../types/author';
import { Book, BookActions } from "../../types/book";

const initialState: Author[] = [];

export enum AuthorTypes {
  Create = 'author/create',
  Edit = 'author/edit',
  Delete = 'author/delete',
}

export enum BookTypes {
  Create = 'book/create',
  Edit = 'book/edit',
  Delete = 'book/delete',
}

export const authorsReducer = (state = initialState, action: any): any => {
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
      const author: Author | undefined = newState.find((author: Author) => author.id === payload.id);
      author?.books.forEach((book: Book) => book.authorName = author?.firstName + ' ' + author?.lastName);
      return newState;
    }

    case AuthorTypes.Delete:
      return state.filter(author => author.id !== payload.id);

    case BookTypes.Create:
      cloneState.find(author => author.id === payload.authorId)?.books?.push(payload);
      return cloneState;

    case BookTypes.Edit: {

      cloneState.forEach((author: Author) => {
        const updateBooks: Book[] = [];
        let result = author?.books?.filter((book: Book) => book.id !== payload.id);
        updateBooks.push(...result);
        author.books = updateBooks;
      });
      const author: any = cloneState.find((author: Author) => author.id === payload.authorId);
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


  createBook: (newBook: Book): BookActions => ({type: BookTypes.Create, payload: newBook}),
  editBook: (book: Book): BookActions => ({type: BookTypes.Edit, payload: book}),
  deleteBook: (book: Book): BookActions => ({type: BookTypes.Delete, payload: book}),
};

export const selectAuthors = (state: any): Author[] => state.authors;
