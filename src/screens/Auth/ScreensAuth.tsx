import { onAuthStateChanged } from 'firebase/auth';
import React, { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

import { AuthFormSignIn } from '../../components/Auth/Form/SignIn/AuthFormSignIn';
import { AuthFormSignUp } from '../../components/Auth/Form/SignUp/AuthFormSignUp';
import { Loader } from '../../components/Loader/Loader';
import { auth } from '../../firebase';
import { useAppDispatch, useAppSelector, useAuth } from '../../hooks';
import { getAllAuthors } from '../../store/authors/actions';
import { getAllBooks } from '../../store/books/actions';

export const ScreensAuth = (): JSX.Element => {
  const { loading } = useAppSelector((state) => state.app);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  const { signIn, logOut, isRegistered } = useAuth();
  const fromPage = (location?.state as Location)?.pathname || '/authors';

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
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
    return () => unsubscribe();
    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    dispatch(getAllAuthors());
    dispatch(getAllBooks());
    // eslint-disable-next-line
  }, []);

  if (loading) {
    return <Loader />;
  }

  return isRegistered ? <AuthFormSignIn /> : <AuthFormSignUp />;
};
