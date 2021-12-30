import React from 'react';
import { useForm } from 'react-hook-form';
import { AuthFormProps, User } from '../../types/inerfaces';
import { useTranslation } from 'react-i18next';
import { MAX_LENGTH, MIN_LENGTH } from '../../constants/constants';
import { useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../../hooks';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';

export const Auth = (): JSX.Element => {
  const { t } = useTranslation('default');
  const navigate = useNavigate();
  const location = useLocation();
  const { isRegistered, setIsRegistered, signIn } = useAuth();
  const fromPage = (location?.state as Location)?.pathname || '/authors';

  const schema = yup.object().shape({
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

  const {
    register,
    handleSubmit,
    reset,
    watch,
    formState: { errors, isValid },
  } = useForm<AuthFormProps>({
    mode: 'all',
    resolver: yupResolver(schema),
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
    <form onSubmit={handleSubmit(onSubmit)}>
      <p>{isRegistered ? t('signIn') : t('signUp')}</p>
      <input
        type='text'
        {...register('login')}
        placeholder={t('placeholders.login')}
      />
      <p>{errors?.login?.message}</p>

      <input
        type='password'
        {...register('password')}
        placeholder={t('placeholders.password')}
      />
      <p>{errors?.password?.message}</p>

      {!isRegistered && (
        <>
          <input
            type='password'
            {...register('confirmPassword')}
            placeholder={t('placeholders.confirmPassword')}
          />
          {passwordCheck() ? (
            <p>{errors?.confirmPassword?.message}</p>
          ) : (
            <p>{t('errors.passwordMismatch')}</p>
          )}
        </>
      )}

      <input
        type='submit'
        value={t('buttons.submit') as string}
        disabled={!isValid}
      />
      <p>
        {!isRegistered ? t('goSignIn') : t('goSignUp')}
        <button onClick={handleClick} type='button'>
          {(!isRegistered ? t('signIn') : t('signUp')) as string}
        </button>
      </p>
    </form>
  );
};
