import React, { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector, useAuth } from '../../hooks';

import { onAuthStateChanged } from 'firebase/auth';
import { auth } from '../../firebase';
import { Loader } from '../../components/Loader/Loader';
import { getAllAuthors } from '../../store/authors/actions';
import { AuthForm } from '../../components/Auth/Form/AuthForm';

export const ScreensAuth = (): JSX.Element => {
  const { loading } = useAppSelector((state) => state.app);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  const { signIn, logOut } = useAuth();
  const fromPage = (location?.state as Location)?.pathname || '/authors';

  useEffect(() => {
    dispatch(getAllAuthors());
    onAuthStateChanged(auth, (user) => {
      if (user) {
        user.getIdToken().then((token) => {
          if (token) {
            signIn(token, () => navigate(fromPage, { replace: true }));
          } else {
            logOut();
          }
        });
      }
    });
    // eslint-disable-next-line
  }, []);

  if (loading) {
    return <Loader />;
  }

  return <AuthForm fromPage={fromPage} />;
};
