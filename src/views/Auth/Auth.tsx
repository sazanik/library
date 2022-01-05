import React from 'react';
import { useForm } from 'react-hook-form';
import { AuthFormProps, User } from '../../types/inerfaces';
import { useTranslation } from 'react-i18next';
import { useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../../hooks';
import { yupResolver } from '@hookform/resolvers/yup';
import { Button, Typography, Link, Box } from '@mui/material';
import { styles } from './Auth.styles';
import { getAuthSchema } from './validation';
import { CustomInput } from '../../components/CustomInput/CustomInput';

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
    resolver: yupResolver(getAuthSchema(t, isRegistered)),
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
    <Box component='form' sx={styles.box}>
      <Typography variant='h4' align='center'>
        {isRegistered ? t('signIn') : t('signUp')}
      </Typography>
      <CustomInput
        sx={styles.textField}
        type='text'
        {...register('login')}
        label={t('placeholders.login')}
        variant='standard'
      />
      <Typography align='center' sx={styles.error}>
        {errors?.login?.message}
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
      <Typography align='center'>
        {!isRegistered ? t('goSignIn') : t('goSignUp')}
        <Link sx={styles.buttons.link} onClick={handleClick} underline='none'>
          {!isRegistered ? t('signIn') : t('signUp')}
        </Link>
      </Typography>
    </Box>
  );
};
