export let storage: Storage;

export const setStorage = (instance: Storage = localStorage): Storage => {
  return (storage = instance);
};

console.log(setStorage());

export const setItem = (name: string, value: string): void => {
  storage.setItem(name, value);
};

export const getItem = async (name: string): Promise<string | null> => {
  return storage.getItem(name);
};

export const removeItem = async (name: string): Promise<void> => {
  await localStorage.storage(name);
};
