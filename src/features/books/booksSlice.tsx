import { Book, BookActions } from '../../types/book';

export enum Types {
  Add = 'books/add',
  Edit = 'books/edit',
  Remove = 'books/remove',
}

const initialState: Book[] = [];

export const booksReducer = (state = initialState, action: BookActions): Book[] => {
  const { type } = action;
  switch (type) {

    default:
      return state;
  }
};
