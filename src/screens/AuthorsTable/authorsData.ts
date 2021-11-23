let count = 1;

function createAuthors(
  firstName: string,
  lastName: string,
  birthDate: string,
  countryOfBirth: string,
  books: any,
  id = (count++).toString(),
) {

  return {firstName, lastName, birthDate, countryOfBirth, books, id};
}

export const authors = [
  createAuthors('Author', 'One', '1999/12/31', 'Armenia', 'Empty'),
  createAuthors('Author', 'Two', '1999/12/31', 'Belarus', 'Empty'),
  createAuthors('Author', 'Three', '1999/12/31', 'England', 'Empty'),
  createAuthors('Author', 'One', '1999/12/31', 'Armenia', 'Empty'),
  createAuthors('Author', 'Two', '1999/12/31', 'Belarus', 'Empty'),
  createAuthors('Author', 'Three', '1999/12/31', 'England', 'Empty'),
  createAuthors('Author', 'One', '1999/12/31', 'Armenia', 'Empty'),
  createAuthors('Author', 'Two', '1999/12/31', 'Belarus', 'Empty'),
  createAuthors('Author', 'Three', '1999/12/31', 'England', 'Empty'),
  createAuthors('Author', 'One', '1999/12/31', 'Armenia', 'Empty'),
  createAuthors('Author', 'Two', '1999/12/31', 'Belarus', 'Empty'),
  createAuthors('Author', 'Three', '1999/12/31', 'England', 'Empty'),
  createAuthors('Author', 'One', '1999/12/31', 'Armenia', 'Empty'),
  createAuthors('Author', 'Two', '1999/12/31', 'Belarus', 'Empty'),
  createAuthors('Author', 'Three', '1999/12/31', 'England', 'Empty'),
  createAuthors('Author', 'One', '1999/12/31', 'Armenia', 'Empty'),
  createAuthors('Author', 'Two', '1999/12/31', 'Belarus', 'Empty'),
  createAuthors('Author', 'One', '1999/12/31', 'Armenia', 'Empty'),
  createAuthors('Author', 'Two', '1999/12/31', 'Belarus', 'Empty'),
  createAuthors('Author', 'Three', '1999/12/31', 'England', 'Empty'),
  createAuthors('Author', 'One', '1999/12/31', 'Armenia', 'Empty'),
  createAuthors('Author', 'Two', '1999/12/31', 'Belarus', 'Empty'),
  createAuthors('Author', 'Three', '1999/12/31', 'England', 'Empty'),
  createAuthors('Author', 'One', '1999/12/31', 'Armenia', 'Empty'),
  createAuthors('Author', 'Two', '1999/12/31', 'Belarus', 'Empty'),
  createAuthors('Author', 'Three', '1999/12/31', 'England', 'Empty'),
  createAuthors('Author', 'One', '1999/12/31', 'Armenia', 'Empty'),
  createAuthors('Author', 'Two', '1999/12/31', 'Belarus', 'Empty'),
  createAuthors('Author', 'Three', '1999/12/31', 'England', 'Empty'),
  createAuthors('Author', 'One', '1999/12/31', 'Armenia', 'Empty'),
  createAuthors('Author', 'Two', '1999/12/31', 'Belarus', 'Empty'),
  createAuthors('Author', 'Three', '1999/12/31', 'England', 'Empty'),
  createAuthors('Author', 'One', '1999/12/31', 'Armenia', 'Empty'),
  createAuthors('Author', 'Two', '1999/12/31', 'Belarus', 'Empty'),
  createAuthors('Author', 'Three', '1999/12/31', 'England', 'Empty'),
];
