import { Book } from '../../config/constants';

const initialState: Book[] = [];

export const booksReducer = (state = initialState, action: { type: string, payload: Book }): Book[] => {
  const { type } = action;
  switch (type) {

    default:
      return state;
  }
};
