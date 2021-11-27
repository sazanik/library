import { createStore, combineReducers } from 'redux';
import { authorsReducer } from '../features/authors/authorsSlice';
import { booksReducer } from '../features/books/booksSlice';


export const store = createStore(combineReducers({
  authors: authorsReducer,
  books: booksReducer,
}), undefined,
  (window as any).__REDUX_DEVTOOLS_EXTENSION__ && (window as any).__REDUX_DEVTOOLS_EXTENSION__()
);

