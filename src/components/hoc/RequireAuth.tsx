import React, { ReactElement } from 'react';
import { Navigate, useLocation } from 'react-router-dom';

interface IProps {
  children: ReactElement;
}

export default function RequireAuth({ children }: IProps): ReactElement {
  const location = useLocation();
  const auth = false;

  if (!auth) {
    return <Navigate to='/' state={{ from: location }} />;
  }

  return children;
}
