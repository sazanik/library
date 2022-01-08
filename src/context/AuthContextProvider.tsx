import React, { createContext, useState } from 'react';
import { AuthContextProps, User } from '../types/inerfaces';

export const AuthContext = createContext<AuthContextProps>(null!);

interface Props {
  children?: JSX.Element;
}

export const AuthContextProvider = ({ children }: Props): JSX.Element => {
  const [isRegistered, setIsRegistered] = useState<boolean>(false);
  const [user, setUser] = useState<User | null>(null);

  const signIn = (newUser: User, cb: () => void): void => {
    setUser(newUser);
    cb();
  };

  const logOut = (cb: () => void): void => {
    setUser(null);
    cb();
  };

  const context: AuthContextProps = {
    user,
    isRegistered,
    setIsRegistered,
    signIn,
    logOut,
  };

  return (
    <AuthContext.Provider value={context}>{children}</AuthContext.Provider>
  );
};
