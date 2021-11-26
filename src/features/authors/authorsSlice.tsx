import constants from '../../config/constants';


const initialState: any = [{
  firstName: 'Author', lastName: '20', birthDate: '1999/12/31', country: 'England', books: 'Empty', id: '0',
}];

export const authorsReducer = (state = initialState, action: { type: string, payload: any }): any => {
  const { type, payload } = action;
  switch (type) {

    case constants.ADD_AUTHOR:
      return [
        ...state,
        payload,
      ];

    default:
      return state;
  }
};


export const createAuthor = (newAuthor: any) => ({ type: constants.ADD_AUTHOR, payload: newAuthor });


export const selectAuthors = (state: any) => state.authors;
