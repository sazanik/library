import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../../../hooks';

interface Props {
  children: JSX.Element;
}

export const AuthRequirement = ({ children }: Props): JSX.Element => {
  const location = useLocation();

  const { user } = useAuth();

  if (!user) {
    return <Navigate to='/' state={location} />;
  }

  return children;
};
