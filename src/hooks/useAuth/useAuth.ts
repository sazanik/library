import { AuthContextProps } from '../../types/inerfaces';
import { useContext } from 'react';
import { AuthProvider } from '../../context/AuthProvider';

export const useAuth = (): AuthContextProps => useContext(AuthProvider);
