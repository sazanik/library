export enum AuthorsActions {
  Add = 'authors/add',
  Edit = 'authors/edit',
  Remove = 'authors/remove',
}

export enum BooksActions {
  Add = 'books/add',
  Edit = 'books/edit',
  Remove = 'books/remove',
}

export interface IAction {
  type: string,
  payload: any
}

export interface IAuthor {
  firstName: string,
  lastName: string,
  birthDate: string,
  country: string,
  books: [],
  id: number | string
}

export interface IBook {}
