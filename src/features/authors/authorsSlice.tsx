let count = 1;

function createAuthors(
  firstName: string,
  lastName: string,
  birthDate: string,
  countryOfBirth: string,
  books: any,
  id = (count++).toString(),
) {

  return { firstName, lastName, birthDate, countryOfBirth, books, id };
}

const initialState = [
  createAuthors('Author', '1', '1999/12/31', 'Armenia', 'Empty'),
  createAuthors('Author', '2', '1999/12/31', 'Belarus', 'Empty'),
  createAuthors('Author', '3', '1999/12/31', 'England', 'Empty'),
  createAuthors('Author', '4', '1999/12/31', 'Armenia', 'Empty'),
  createAuthors('Author', '5', '1999/12/31', 'Belarus', 'Empty'),
  createAuthors('Author', '6', '1999/12/31', 'England', 'Empty'),
  createAuthors('Author', '7', '1999/12/31', 'Armenia', 'Empty'),
  createAuthors('Author', '8', '1999/12/31', 'Belarus', 'Empty'),
  createAuthors('Author', '9', '1999/12/31', 'England', 'Empty'),
  createAuthors('Author', '10', '1999/12/31', 'Armenia', 'Empty'),
  createAuthors('Author', '11', '1999/12/31', 'Belarus', 'Empty'),
  createAuthors('Author', '12', '1999/12/31', 'England', 'Empty'),
  createAuthors('Author', '13', '1999/12/31', 'Armenia', 'Empty'),
  createAuthors('Author', '14', '1999/12/31', 'Belarus', 'Empty'),
  createAuthors('Author', '15', '1999/12/31', 'England', 'Empty'),
  createAuthors('Author', '16', '1999/12/31', 'Armenia', 'Empty'),
  createAuthors('Author', '17', '1999/12/31', 'Belarus', 'Empty'),
  createAuthors('Author', '18', '1999/12/31', 'Armenia', 'Empty'),
  createAuthors('Author', '19', '1999/12/31', 'Belarus', 'Empty'),
  createAuthors('Author', '20', '1999/12/31', 'England', 'Empty'),
  createAuthors('Author', '21', '1999/12/31', 'Armenia', 'Empty'),
  createAuthors('Author', '22', '1999/12/31', 'Belarus', 'Empty'),
  createAuthors('Author', '23', '1999/12/31', 'England', 'Empty'),
  createAuthors('Author', '24', '1999/12/31', 'Armenia', 'Empty'),
  createAuthors('Author', '25', '1999/12/31', 'Belarus', 'Empty'),
  createAuthors('Author', '26', '1999/12/31', 'England', 'Empty'),
  createAuthors('Author', '27', '1999/12/31', 'Armenia', 'Empty'),
  createAuthors('Author', '28', '1999/12/31', 'Belarus', 'Empty'),
  createAuthors('Author', '29', '1999/12/31', 'England', 'Empty'),
  createAuthors('Author', '30', '1999/12/31', 'Armenia', 'Empty'),
  createAuthors('Author', '31', '1999/12/31', 'Belarus', 'Empty'),
  createAuthors('Author', '32', '1999/12/31', 'England', 'Empty'),
  createAuthors('Author', '33', '1999/12/31', 'Armenia', 'Empty'),
  createAuthors('Author', '34', '1999/12/31', 'Belarus', 'Empty'),
  createAuthors('Author', '35', '1999/12/31', 'England', 'Empty'),
];

export const authorsReducer = (state = initialState, action: { type: string, payload: any }): any => {
  const { type, payload } = action;
  switch (type) {

    default:
      return state;
  }
};

export const selectAuthors = (state: any) => state.authors
