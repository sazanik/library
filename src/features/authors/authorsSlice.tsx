import { Author, AuthorActions } from '../../types/author';
import { State } from '../../types/state';

const initialState: Author[] = [{
  firstName: 'Test',
  lastName: 'Author',
  birthDate: 19991212,
  country: 'Belarus',
  books: [],
  id: 1,
}];

export enum Types {
  Add = 'authors/add',
  Edit = 'authors/edit',
  Remove = 'authors/remove',
}

export const authorsReducer = (state = initialState, action: AuthorActions): Author[] => {
  const { type, payload } = action;
  switch (type) {
    case Types.Add:
      return [
        ...state,
        payload,
      ];

    case Types.Edit:
      return [
        ...state.filter(author => author.id !== payload.id),
        payload
      ]

    case Types.Remove:
      return state.filter(author => author.id !== payload.id);

    default:
      return state;
  }
};

export const actions = {
  addAuthor: (newAuthor: Author) => ({ type: Types.Add, payload: newAuthor }),
  editAuthor:  (author: Author) => ({ type: Types.Edit, payload: author }),
  removeAuthor: (author: Author) => ({ type: Types.Remove, payload: author }),
}


export const selectAuthors = (state: State): Author[] => state.authors;
