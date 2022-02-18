import { yupResolver } from '@hookform/resolvers/yup';
import { Box, Button, Link, Typography } from '@mui/material';
import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { useLocation, useNavigate } from 'react-router-dom';

import { AuthFormSignIn } from '../../components/Auth/Form/SignIn/AuthFormSignIn';
import { getSignInSchema } from '../../components/Auth/Form/SignIn/validation';
import { AuthFormSignUp } from '../../components/Auth/Form/SignUp/AuthFormSignUp';
import { Loader } from '../../components/Loader/Loader';
import { useAppDispatch, useAppSelector, useAuth } from '../../hooks';
import { signInUser, signUpUser } from '../../store/newAuth/asyncActions';
import { AuthFormProps } from '../../types/inerfaces';
import { styles } from './Auth.styles';

export const Auth = (): JSX.Element => {
  const { t } = useTranslation();
  const store = useAppSelector((state) => state);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const { isRegistered, setIsRegistered, token, handlerSetToken } = useAuth();

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
            email: data.email,
            password: data.password,
          })
        ).then(({ payload: newToken }) => {
          if (newToken) {
            handlerSetToken(newToken as string);
            navigate(fromPage, { replace: true });
          }
        })
      : dispatch(
          signUpUser({
            username: data.email,
            email: data.email,
            password: data.password,
          })
        );
  };

  useEffect(() => {
    if (token) {
      navigate(fromPage, { replace: true });
    }
  }, [token]);

  if (store.newAuth.isLoading) {
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
        {store.newAuth.error}
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
