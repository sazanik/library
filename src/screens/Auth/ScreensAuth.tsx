import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { AuthFormProps } from '../../types/inerfaces';
import { useTranslation } from 'react-i18next';
import { useLocation, useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector, useAuth } from '../../hooks';
import { yupResolver } from '@hookform/resolvers/yup';
import { Box, Button, Link, Typography } from '@mui/material';
import { styles } from './ScreensAuth.styles';
import { getAuthSchema } from './validation';
import { Input } from '../../components/Input/Input';
import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signInWithEmailAndPassword,
} from 'firebase/auth';
import { auth } from '../../firebase';
import { Loader } from '../../components/Loader/Loader';
import { getAllAuthors } from '../../store/authors/actions';

export const ScreensAuth = (): JSX.Element => {
  const { loading } = useAppSelector((state) => state.app);
  const dispatch = useAppDispatch();
  const { t } = useTranslation('default');
  const [serverError, setServerError] = useState(null);
  const navigate = useNavigate();
  const location = useLocation();

  const { isRegistered, setIsRegistered, signIn, logOut } = useAuth();
  const fromPage = (location?.state as Location)?.pathname || '/authors';

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<AuthFormProps>({
    mode: 'onSubmit',
    resolver: yupResolver(getAuthSchema(t, isRegistered)),
  });

  const onSubmit = (data: { email: string; password: string }): void => {
    const wrapperAuth = isRegistered
      ? signInWithEmailAndPassword
      : createUserWithEmailAndPassword;
    wrapperAuth(auth, data.email, data.password)
      .then((userCredential) => userCredential.user.getIdToken())
      .then((token) => {
        signIn(token, () => navigate(fromPage, { replace: true }));
        reset();
      })
      .catch((error) => {
        setServerError(error.message);
      });
  };

  const handleClick = (): void => {
    setIsRegistered((prev) => !prev);
  };

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
  }, []);

  if (loading) {
    return <Loader />;
  }

  return (
    <Box component='form' sx={styles.box}>
      <Typography variant='h4' align='center'>
        {isRegistered ? t('signIn') : t('signUp')}
      </Typography>
      <Input
        sx={styles.textField}
        type='text'
        {...register('email')}
        label={t('placeholders.email')}
        variant='standard'
      />
      <Typography align='center' sx={styles.error}>
        {errors?.email?.message}
      </Typography>

      <Input
        sx={styles.textField}
        type='password'
        {...register('password')}
        label={t('placeholders.password')}
        variant='standard'
      />
      <Typography align='center' sx={styles.error}>
        {errors?.password?.message}
      </Typography>

      {!isRegistered && (
        <>
          <Input
            sx={styles.textField}
            type='password'
            {...register('confirmPassword')}
            label={t('placeholders.confirmPassword')}
            variant='standard'
          />

          <Typography align='center' sx={styles.error}>
            {errors?.confirmPassword?.message}
          </Typography>
        </>
      )}

      <Button
        sx={styles.buttons.submit}
        onClick={handleSubmit(onSubmit)}
        variant='contained'
      >
        {t('buttons.submit')}
      </Button>
      <Typography align='center' sx={styles.error}>
        {serverError}
      </Typography>
      <Typography align='center'>
        {!isRegistered ? t('goSignIn') : t('goSignUp')}
        <Link sx={styles.buttons.link} onClick={handleClick} underline='none'>
          {!isRegistered ? t('signIn') : t('signUp')}
        </Link>
      </Typography>
    </Box>
  );
};
