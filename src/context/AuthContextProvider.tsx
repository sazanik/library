import React, { createContext, useState } from 'react';
import { AuthContextProps } from '../types/inerfaces';
import { getAuth } from 'firebase/auth';

export const AuthContext = createContext<AuthContextProps>(null!);

interface Props {
  children?: JSX.Element;
}

export const AuthContextProvider = ({ children }: Props): JSX.Element => {
  const [isRegistered, setIsRegistered] = useState<boolean>(false);
  const [token, setToken] = useState<string | null>(null);
  const auth = getAuth();

  const signIn = (newToken: string, cb: () => void): void => {
    setToken(newToken);
    cb();
  };

  const logOut = (): void => {
    setToken(null);
    auth
      .signOut()
      .then((r) => console.log(r))
      .catch((e) => console.error(e));
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
