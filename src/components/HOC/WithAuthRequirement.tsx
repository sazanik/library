import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';

import { useAuth } from '../../hooks';

interface ComponentProps {
  children: JSX.Element;
}

export const WithAuthRequirement = ({ children }: ComponentProps): JSX.Element => {
  const location = useLocation();
  const { token } = useAuth();

  if (!token) {
    return <Navigate to='/' state={location} />;
  }

  return children;
};
