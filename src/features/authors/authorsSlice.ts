import { Author } from '../../types/author';
import { State } from '../../types/state';
import { Book } from "../../types/book";

const initialState: Author[] = [{
  firstName: 'Test',
  lastName: 'Author',
  birthDate: '19991212',
  country: 'Belarus',
  books: [],
  id: '1',
}];

export enum Types {
  Create = 'authors/create',
  Edit = 'authors/edit',
  Delete = 'authors/delete',
  AddBook = 'authors/addBook',
  DeleteBook = 'authors/deleteBook'
}

export const authorsReducer = (state = initialState, action: any): Author[] => {
  const {type, payload} = action;
  switch (type) {
    case Types.Create:
      return [
        ...state,
        payload,
      ];

    case Types.Edit:
      return [
        ...state.filter(author => author.id !== payload.id),
        payload
      ]

    case Types.Delete:
      return [
        ...state.filter(author => author.id !== payload.id)
      ]

    case Types.AddBook:
      const cloneState = [...state]
      cloneState.find(author => author.id === payload.authorId)?.books?.push(payload)
      return [
        ...cloneState
      ]

    default:
      return state;
  }
};

export const actions = {
  createAuthor: (newAuthor: Author) => ({type: Types.Create, payload: newAuthor}),
  editAuthor: (author: Author) => ({type: Types.Edit, payload: author}),
  removeAuthor: (author: Author) => ({type: Types.Delete, payload: author}),
  addBook: (book: Book) => ({type: Types.AddBook, payload: book})
}

export const selectAuthors = (state: State): Author[] => state.authors;
