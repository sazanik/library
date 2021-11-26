const initialState: any = [];

export const booksReducer = (state = initialState, action: { type: string, payload: any }): any => {
  const { type, payload } = action;
  switch (type) {

    default:
      return state;
  }
};
