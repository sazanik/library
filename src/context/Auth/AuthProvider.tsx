import React, { createContext, ReactElement, useState } from 'react';
import { IAuthContext, IUser } from '../../types/inerfaces';

export const AuthContext = createContext<IAuthContext>(null!);

interface IProps {
  children: ReactElement;
}

export default function AuthProvider({ children }: IProps): ReactElement {
  const [isRegistered, setIsRegistered] = useState<boolean>(false);
  const [user, setUser] = useState<IUser | null>(null);

  const signIn = (newUser: IUser, cb: () => void): void => {
    setUser(newUser);
    cb();
  };

  const signOut = (newUser: IUser, cb: () => void): void => {
    setUser(newUser);
    cb();
  };

  const authContext: IAuthContext = {
    user,
    isRegistered,
    setIsRegistered,
    signIn,
    signOut,
  };

  return (
    <AuthContext.Provider value={authContext}>{children}</AuthContext.Provider>
  );
}
