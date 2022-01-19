import { yupResolver } from '@hookform/resolvers/yup';
import { LoadingButton } from '@mui/lab';
import { Box, CircularProgress, Link, Typography } from '@mui/material';
import React from 'react';
import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';

import { auth } from '../../../firebase';
import { useAppDispatch, useAppSelector, useAuth } from '../../../hooks';
import { userAuth } from '../../../store/users/actions';
import { AuthFormProps } from '../../../types/inerfaces';
import { Input } from '../../Input/Input';
import { styles } from './AuthForm.styles';
import { getAuthSchema } from './validation';

export const AuthForm = (): JSX.Element => {
  const { t } = useTranslation();
  const { additionalError, loading } = useAppSelector((state) => state.app);
  const dispatch = useAppDispatch();
  const { isRegistered, setIsRegistered } = useAuth();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<AuthFormProps>({
    mode: 'onSubmit',
    resolver: yupResolver(getAuthSchema(t, isRegistered)),
  });

  const onSubmit = (data: AuthFormProps): void => {
    dispatch(
      userAuth({
        auth,
        email: data.email,
        password: data.password,
        isRegistered,
      })
    );
  };

  const handleClick = (): void => {
    setIsRegistered((prev) => !prev);
  };

  return (
    <Box component='form' sx={styles.box}>
      <Typography variant='h4' align='center'>
        {isRegistered ? t('glossary:signIn') : t('glossary:signUp')}
      </Typography>
      <Input
        sx={styles.textField}
        type='text'
        {...register('email')}
        label={t('placeholders:email')}
        variant='standard'
      />
      <Typography align='center' sx={styles.error}>
        {errors?.email?.message}
      </Typography>
      <Input
        sx={styles.textField}
        type='password'
        {...register('password')}
        label={t('placeholders:password')}
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
            label={t('placeholders:confirmPassword')}
            variant='standard'
          />

          <Typography align='center' sx={styles.error}>
            {errors?.confirmPassword?.message}
          </Typography>
        </>
      )}
      <LoadingButton
        loading={loading}
        loadingIndicator={<CircularProgress color='inherit' size={16} />}
        sx={styles.buttons.submit}
        onClick={handleSubmit(onSubmit)}
        variant='contained'
      >
        {t('buttons:submit')}
      </LoadingButton>
      <Typography align='center' sx={styles.error}>
        {additionalError}
      </Typography>
      <Typography align='center'>
        {!isRegistered ? t('glossary:goSignIn') : t('glossary:goSignUp')}
        <Link sx={styles.buttons.link} onClick={handleClick} underline='none'>
          {!isRegistered ? t('glossary:signIn') : t('glossary:signUp')}
        </Link>
      </Typography>
    </Box>
  );
};
