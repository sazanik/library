import React from 'react';
import { useForm } from 'react-hook-form';
import { AuthFormProps, User } from '../../types/inerfaces';
import { TFunction, useTranslation } from 'react-i18next';
import { MAX_LENGTH, MIN_LENGTH } from '../../constants/constants';
import { useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../../hooks';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { Button, TextField, Typography, Link, Box } from '@mui/material';
import { styles } from './Auth.styles';
import { AnyObjectSchema } from 'yup';

const getLoginSchema = (t: TFunction, isRegistered: boolean): AnyObjectSchema =>
  yup.object().shape({
    login: yup
      .string()
      .required(t('errors.required'))
      .min(MIN_LENGTH.LOGIN, t('errors.minLength') + MIN_LENGTH.LOGIN)
      .max(MAX_LENGTH.LOGIN, t('errors.maxLength') + MAX_LENGTH.LOGIN),
    password: yup
      .string()
      .required(t('errors.required'))
      .min(MIN_LENGTH.PASSWORD, t('errors.minLength') + MIN_LENGTH.PASSWORD)
      .max(MAX_LENGTH.PASSWORD, t('errors.maxLength') + MAX_LENGTH.PASSWORD),
    ...(!isRegistered && {
      confirmPassword: yup
        .string()
        .oneOf([yup.ref('password'), null])
        .required(t('errors.passwordMismatch')),
    }),
  });

export const Auth = (): JSX.Element => {
  const { t } = useTranslation('default');
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
    resolver: yupResolver(getLoginSchema(t, isRegistered)),
  });

  const onSubmit = (data: User): void => {
    signIn(
      {
        login: data.login,
        password: data.password,
      },
      () => navigate(fromPage, { replace: true })
    );
    reset();
  };

  const handleClick = (): void => {
    setIsRegistered((prev) => !prev);
  };

  const passwordCheck = (): boolean => {
    if (isRegistered) return true;
    return watch('password') === watch('confirmPassword');
  };

  return (
    <Box sx={styles.box}>
      <Typography variant='h4' align='center'>
        {isRegistered ? t('signIn') : t('signUp')}
      </Typography>
      <TextField
        sx={styles.textField}
        type='text'
        {...register('login')}
        label={t('placeholders.login')}
        variant='standard'
      />
      <Typography align='center' sx={styles.error}>
        {errors?.login?.message}
      </Typography>

      <TextField
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
          <TextField
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
      <Typography align='center'>
        {!isRegistered ? t('goSignIn') : t('goSignUp')}
        <Link sx={styles.buttons.link} onClick={handleClick} underline='none'>
          {!isRegistered ? t('signIn') : t('signUp')}
        </Link>
      </Typography>
    </Box>
  );
};
