import { yupResolver } from '@hookform/resolvers/yup';
import { Box, Button, Link, Typography } from '@mui/material';
import { onAuthStateChanged } from 'firebase/auth';
import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { useLocation, useNavigate } from 'react-router-dom';

import { AuthFormSignIn } from '../../components/Auth/Form/SignIn/AuthFormSignIn';
import { getSignInSchema } from '../../components/Auth/Form/SignIn/validation';
import { AuthFormSignUp } from '../../components/Auth/Form/SignUp/AuthFormSignUp';
import { Loader } from '../../components/Loader/Loader';
import { auth } from '../../firebase';
import { useAppDispatch, useAppSelector, useAuth } from '../../hooks';
import { getAuthorsCollection, getAuthorsCollectionSize } from '../../store/authors/asyncActions';
import { getBooksCollection, getBooksCollectionSize } from '../../store/books/asyncActions';
import { signInUser, signUpUser } from '../../store/users/asyncActions';
import { setIsUsersLoading } from '../../store/users/usersSlice';
import { AuthFormProps } from '../../types/inerfaces';
import { styles } from './Auth.styles';

export const Auth = (): JSX.Element => {
  const { t } = useTranslation();
  const store = useAppSelector((state) => state);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const { signIn, logOut, isRegistered, setIsRegistered } = useAuth();

  const fromPage = (location?.state as Location)?.pathname || '/authors';

  const handleClick = (): void => {
    setIsRegistered((prev) => !prev);
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<AuthFormProps>({
    mode: 'onSubmit',
    resolver: yupResolver(getSignInSchema(t)),
  });

  const onSubmit = (data: AuthFormProps): void => {
    isRegistered
      ? dispatch(
          signInUser({
            auth,
            email: data.email,
            password: data.password,
          })
        )
      : dispatch(
          signUpUser({
            auth,
            email: data.email,
            password: data.password,
          })
        );
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        dispatch(getAuthorsCollection());
        dispatch(getBooksCollection());
        dispatch(getAuthorsCollectionSize());
        dispatch(getBooksCollectionSize());
        user.getIdToken().then((newToken) => {
          if (newToken) {
            signIn(newToken, () => navigate(fromPage, { replace: true }));
          } else {
            logOut();
          }
        });
      } else {
        dispatch(setIsUsersLoading(false));
      }
    });

    return () => {
      unsubscribe();
      dispatch(setIsUsersLoading(false));
    };
    // eslint-disable-next-line
  }, []);

  if (store.users.isLoading) {
    return <Loader />;
  }

  return (
    <Box component='form' sx={styles.box}>
      <Typography variant='h4' align='center'>
        {isRegistered ? t('buttons:signIn') : t('buttons:signUp')}
      </Typography>

      {isRegistered ? (
        <AuthFormSignIn register={register} errors={errors} />
      ) : (
        <AuthFormSignUp register={register} errors={errors} />
      )}

      <Button sx={styles.buttons.submit} onClick={handleSubmit(onSubmit)} variant='contained'>
        {t('buttons:submit')}
      </Button>
      <Typography align='center' sx={styles.error}>
        {store.users.error}
      </Typography>
      <Typography align='center'>
        {!isRegistered ? t('glossary:goSignIn') : t('glossary:goSignUp')}
        <Link sx={styles.buttons.link} onClick={handleClick} underline='none'>
          {!isRegistered ? t('buttons:signIn') : t('buttons:signUp')}
        </Link>
      </Typography>
    </Box>
  );
};
