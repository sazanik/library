import { createStore, combineReducers } from 'redux';
import { authorsReducer } from '../features/authors/authorsSlice';


export const store = createStore(combineReducers({
    authors: authorsReducer,
  }), undefined,
  (window as any).__REDUX_DEVTOOLS_EXTENSION__ && (window as any).__REDUX_DEVTOOLS_EXTENSION__()
);

