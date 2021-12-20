import React, { ReactElement } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../../App/hooks';

interface Props {
  children: ReactElement;
}

export default function RequireAuth({ children }: Props): ReactElement {
  const location = useLocation();

  const { user } = useAuth();

  if (!user) {
    return <Navigate to='/' state={{ from: location }} />;
  }

  return children;
}
