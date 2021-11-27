import { IAction, IAuthor, AuthorsActions as Actions } from '../../config/constants';

export const authorsReducer = (state = [], action: IAction): any => {
  const { type, payload } = action;
  switch (type) {
    case Actions.Add:
      return [
        ...state,
        payload,
      ];

    default:
      return state;
  }
};

export const addAuthor = (newAuthor: IAuthor) => ({ type: Actions.Add, payload: newAuthor });

export const selectAuthors = (state: any) => state.authors;
