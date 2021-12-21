import { AuthContextProps } from '../types/inerfaces';
import { useContext } from 'react';
import { AuthContext } from '../context/Auth/AuthProvider';

export const useAuth = (): AuthContextProps => useContext(AuthContext);
