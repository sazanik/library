import { createStore, combineReducers } from 'redux';
import { libraryReducer } from "../features/library/librarySlice";

export const store = createStore(combineReducers({
    library: libraryReducer,
  }), undefined,
  (window as any).__REDUX_DEVTOOLS_EXTENSION__ && (window as any).__REDUX_DEVTOOLS_EXTENSION__()
);

