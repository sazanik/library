import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { AuthFormProps } from '../../types/inerfaces';
import { useTranslation } from 'react-i18next';
import { useLocation, useNavigate } from 'react-router-dom';
import { useAppDispatch, useAuth } from '../../hooks';
import { yupResolver } from '@hookform/resolvers/yup';
import { Button, Typography, Link, Box } from '@mui/material';
import { styles } from './ScreensAuth.styles';
import { getAuthSchema } from './validation';
import { CustomInput } from '../../components/UI/CustomInput/CustomInput';
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from 'firebase/auth';
import { createUser } from '../../store/users/usersSlice';

export const ScreensAuth = (): JSX.Element => {
  const { t } = useTranslation('default');
  const [error, setError] = useState(null);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const { isRegistered, setIsRegistered, signIn } = useAuth();
  const fromPage = (location?.state as Location)?.pathname || '/authors';

  const {
    register,
    handleSubmit,
    reset,
    watch,
    formState: { errors, isValid },
  } = useForm<AuthFormProps>({
    mode: 'all',
    resolver: yupResolver(getAuthSchema(t, isRegistered)),
  });

  const onSubmit = (data: { email: string; password: string }): void => {
    const auth = getAuth();

    const wrapperAuth = isRegistered
      ? signInWithEmailAndPassword
      : createUserWithEmailAndPassword;

    wrapperAuth(auth, data.email, data.password)
      .then((userCredential) => userCredential.user.getIdToken())
      .then((token) => {
        if (!isRegistered) {
          const newUser = {
            id: Date.now().toString().slice(5),
            email: data.email,
            token,
          };
          dispatch(createUser(newUser));
        }
        signIn(token, () => navigate(fromPage, { replace: true }));
        reset();
      })
      .catch((firebaseError) => {
        setError(firebaseError.message);
      });
  };

  const handleClick = (): void => {
    setIsRegistered((prev) => !prev);
  };

  const passwordCheck = (): boolean => {
    if (isRegistered) return true;
    return watch('password') === watch('confirmPassword');
  };

  return (
    <Box component='form' sx={styles.box}>
      <Typography variant='h4' align='center'>
        {isRegistered ? t('signIn') : t('signUp')}
      </Typography>
      <CustomInput
        sx={styles.textField}
        type='text'
        {...register('email')}
        label={t('placeholders.email')}
        variant='standard'
      />
      <Typography align='center' sx={styles.error}>
        {errors?.email?.message}
      </Typography>

      <CustomInput
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
          <CustomInput
            sx={styles.textField}
            type='password'
            {...register('confirmPassword')}
            label={t('placeholders.confirmPassword')}
            variant='standard'
          />
          {passwordCheck() ? (
            <Typography align='center' sx={styles.error}>
              {errors?.confirmPassword?.message}
            </Typography>
          ) : (
            <Typography align='center' sx={styles.error}>
              {t('errors.passwordMismatch')}
            </Typography>
          )}
        </>
      )}

      <Button
        sx={styles.buttons.submit}
        onClick={handleSubmit(onSubmit)}
        variant='contained'
        disabled={!isValid}
      >
        {t('buttons.submit')}
      </Button>
      <Typography align='center' sx={styles.error}>
        {error}
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
