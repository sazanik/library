import { store } from '../../store/store';

export const setLocalStore = (): void =>
  localStorage.setItem('store', JSON.stringify(store.getState()));
