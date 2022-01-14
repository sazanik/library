enum ActionTypes {
  setError = 'app/setError',
}

interface Action {
  type: ActionTypes;
  payload: Error | string;
}

export const setError = (payload: Error | string): Action => {
  return {
    type: ActionTypes.setError,
    payload,
  };
};
