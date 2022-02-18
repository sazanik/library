import React, { createContext, useEffect, useState } from 'react';

import {
  getStorageToken,
  removeStorageToken,
  setStorageToken,
} from '../packages/storage/adapters/token';
import { AuthContextProps } from '../types/inerfaces';

export const AuthContext = createContext<AuthContextProps>(null!);

interface Props {
  children?: JSX.Element;
}

export const AuthContextProvider = ({ children }: Props): JSX.Element => {
  const [isRegistered, setIsRegistered] = useState<boolean>(false);
  const [token, setToken] = useState<string | null>(null);

  const handlerSetToken = (newToken: string): void => {
    setToken(newToken);
    setStorageToken(newToken);
  };

  const handlerSignOut = (): void => {
    setToken(null);
    removeStorageToken();
  };

  useEffect(() => {
    getStorageToken().then((oldToken) => setToken(oldToken));
  }, []);

  const context: AuthContextProps = {
    isRegistered,
    setIsRegistered,
    token,
    handlerSetToken,
    handlerSignOut,
  };

  return <AuthContext.Provider value={context}>{children}</AuthContext.Provider>;
};
