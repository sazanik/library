import {
  AuthorActionTypes as types,
  Author,
  AuthorData,
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

export const authorsReducer = (state = initialState, action: AuthorActions): (Author | AuthorData)[] => {
  const { type, payload } = action;
  switch (type) {
    case types.Add:
      return [
        ...state,
        payload,
      ];

    case types.Remove:
      return state.filter(author => author.id !== payload);

    default:
      return state;
  }
};

export const addAuthor = (newAuthor: Author) => ({ type: types.Add, payload: newAuthor });
export const removeAuthor = (id: number) => ({ type: types.Remove, payload: id });

export const selectAuthors = (state: State): Author[] => state.authors;
