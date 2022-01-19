import { useContext } from 'react';

import { AuthContext } from '../../context/AuthContextProvider';
import { AuthContextProps } from '../../types/inerfaces';

export const useAuth = (): AuthContextProps => useContext(AuthContext);
