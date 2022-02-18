import storage from '../index';

const setStorageToken = async (token: string): Promise<void> => {
  storage.setItem('token', token);
};

const getStorageToken = async (): Promise<string | null> => {
  return await storage.getItem('token');
};

const removeStorageToken = async (): Promise<void> => {
  storage.removeItem('token');
};

export { getStorageToken, removeStorageToken, setStorageToken };
