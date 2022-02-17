let storage: Storage;

export const setStorage = (instance: Storage = localStorage): Storage => {
  return (storage = instance);
};

console.log(setStorage());

const setItem = (name: string, value: string): void => {
  storage.setItem(name, value);
};

const getItem = async (name: string): Promise<string | null> => {
  return storage.getItem(name);
};

const removeItem = async (name: string): Promise<void> => {
  await localStorage.storage(name);
};

export default {
  setItem,
  getItem,
  removeItem,
};
