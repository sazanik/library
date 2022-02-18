import React, { createContext, useEffect, useState } from 'react';

import { useAppDispatch } from '../hooks';
import {
  getStorageToken,
  removeStorageToken,
  setStorageToken,
} from '../packages/storage/adapters/token';
import { setIsNewAuthLoading } from '../store/newAuth/newAuthSlice';
import { AuthContextProps } from '../types/inerfaces';

export const AuthContext = createContext<AuthContextProps>(null!);

interface Props {
  children?: JSX.Element;
}

export const AuthContextProvider = ({ children }: Props): JSX.Element => {
  const [isRegistered, setIsRegistered] = useState<boolean>(false);
  const [token, setToken] = useState<string | null>(null);
  const dispatch = useAppDispatch();

  const handlerSetToken = (newToken: string): void => {
    setToken(newToken);
    setStorageToken(newToken);
  };

  const handlerSignOut = (): void => {
    setToken(null);
    removeStorageToken();
  };

  useEffect(() => {
    getStorageToken().then((oldToken) => {
      dispatch(setIsNewAuthLoading(false));
      setToken(oldToken);
    });
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
