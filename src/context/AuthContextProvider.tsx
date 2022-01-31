import React, { createContext, useState } from 'react';

import { useAppDispatch } from '../hooks';
import { signOutUser } from '../store/users/actions';
import { AuthContextProps } from '../types/inerfaces';

export const AuthContext = createContext<AuthContextProps>(null!);

interface Props {
  children?: JSX.Element;
}

export const AuthContextProvider = ({ children }: Props): JSX.Element => {
  const dispatch = useAppDispatch();
  const [isRegistered, setIsRegistered] = useState<boolean>(false);
  const [token, setToken] = useState<string | null>(null);

  const signIn = (newToken: string, cb: () => void): void => {
    setToken(newToken);
    cb();
  };

  const logOut = (): void => {
    setToken(null);
    dispatch(signOutUser());
  };

  const context: AuthContextProps = {
    token,
    isRegistered,
    setIsRegistered,
    signIn,
    logOut,
  };

  return (
    <AuthContext.Provider value={context}>{children}</AuthContext.Provider>
  );
};
