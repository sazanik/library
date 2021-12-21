import React, { createContext, useState } from 'react';
import { AuthProps, User } from '../../types/inerfaces';

export const AuthContext = createContext<AuthProps>(null!);

interface Props {
  children?: JSX.Element;
}

export const AuthProvider = ({ children }: Props): JSX.Element => {
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

  const authContext: AuthProps = {
    user,
    isRegistered,
    setIsRegistered,
    signIn,
    logOut,
  };

  return (
    <AuthContext.Provider value={authContext}>{children}</AuthContext.Provider>
  );
};
