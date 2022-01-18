import React, { useState } from 'react';
import { Box, CircularProgress, Link, Typography } from '@mui/material';
import { LoadingButton } from '@mui/lab';
import { Input } from '../../Input/Input';
import { useForm } from 'react-hook-form';
import { AuthFormProps } from '../../../types/inerfaces';
import { yupResolver } from '@hookform/resolvers/yup';
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from 'firebase/auth';
import { auth } from '../../../firebase';
import { useAuth } from '../../../hooks';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { getAuthSchema } from './validation';
import { styles } from './AuthForm.styles';

interface Props {
  fromPage: string;
}

export const AuthForm = ({ fromPage }: Props): JSX.Element => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [serverError, setServerError] = useState('');
  const { isRegistered, setIsRegistered, signIn } = useAuth();
  const [loading, setLoading] = useState(false);

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
    setLoading(true);
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
      })
      .finally(() => {
        setLoading(false);
      });
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
        {serverError}
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
