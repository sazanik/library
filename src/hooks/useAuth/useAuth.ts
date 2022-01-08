import { AuthContextProps } from '../../types/inerfaces';
import { useContext } from 'react';
import { AuthContext } from '../../context/AuthContextProvider';

export const useAuth = (): AuthContextProps => useContext(AuthContext);
