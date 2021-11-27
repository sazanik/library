import {
  AuthorActionTypes as types,
  Author,
  AuthorActions,
  State,
} from '../../config/constants';

const initialState: Author[] = [{
  firstName: 'Test',
  lastName: 'Author',
  birthDate: 19991212,
  country: 'Belarus',
  books: [],
  id: 1,
}];

export const authorsReducer = (state = initialState, action: AuthorActions): Author[] => {
  const { type, payload } = action;
  switch (type) {
    case types.Add:
      return [
        ...state,
        payload,
      ];

    case types.Edit:
      return [
        ...state.filter(author => author.id !== payload.id),
        payload
      ]

    case types.Remove:
      return state.filter(author => author.id !== payload.id);

    default:
      return state;
  }
};

export const addAuthor = (newAuthor: Author) => ({ type: types.Add, payload: newAuthor });
export const editAuthor = (author: Author) => ({ type: types.Edit, payload: author });
export const removeAuthor = (author: Author) => ({ type: types.Remove, payload: author });

export const selectAuthors = (state: State): Author[] => state.authors;
