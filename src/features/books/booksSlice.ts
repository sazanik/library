import { Book, BookActions } from '../../types/book';
import { State } from "../../types/state";

export enum Types {
  Create = 'books/create',
  Edit = 'books/edit',
  Delete = 'books/delete',
}

const initialState: Book[] = [{
  title: 'React',
  description: 'Learning book',
  code: '2344536456',
  authorName: 'Test',
  pagesCount: '200',
  year: '2000',
  id: '1',
  authorId: '1'
}];

export const booksReducer = (state = initialState, action: BookActions): Book[] => {
  const {type, payload} = action;
  switch (type) {

    case Types.Create:
      return [
        ...state,
        payload,
      ];

    case Types.Edit:
      return [
        ...state.filter(book => book.id !== payload.id),
        payload
      ]

    case Types.Delete:
      return state.filter(book => book.id !== payload.id);

    default:
      return state;
  }
};

export const actions = {
  createBook: (newBook: Book) => ({type: Types.Create, payload: newBook}),
  editBook: (book: Book) => ({type: Types.Edit, payload: book}),
  removeBook: (book: Book) => ({type: Types.Delete, payload: book}),
}

export const selectBooks = (state: State): Book[] => state.books;
