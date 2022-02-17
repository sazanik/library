import storage from '../index';

const setToken = async (token: string): Promise<void> => {
  storage.setItem('token', token);
};

const getToken = async (): Promise<string | null> => {
  return storage.getItem('token');
};

export { getToken, setToken };
