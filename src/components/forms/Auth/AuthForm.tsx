import React, { ReactElement } from 'react';
import { useForm } from 'react-hook-form';
import { IUser } from '../../../types/inerfaces';
import { useTranslation } from 'react-i18next';
import { useAuth } from '../../../App/hooks';
import { MAX_LENGTH, MIN_LENGTH } from '../../../constants/constants';
import { useLocation, useNavigate } from 'react-router-dom';

export default function AuthForm(): ReactElement {
  const { t } = useTranslation('default');
  const navigate = useNavigate();
  const location = useLocation();
  const fromPage = location.state?.from?.pathname || '/authors';
  const { isRegistered, setIsRegistered, signIn } = useAuth();
  const {
    register,
    handleSubmit,
    reset,
    watch,
    formState: { errors, isValid },
  } = useForm({ mode: 'onChange' });

  const onSubmit = (data: IUser): void => {
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
    return watch('password') === watch('repeatPassword');
  };

  const validation = {
    login: {
      required: t('errors.required'),
      minLength: {
        value: MIN_LENGTH.LOGIN,
        message: t('errors.minLength') + MIN_LENGTH.LOGIN,
      },
      maxLength: {
        value: MAX_LENGTH.LOGIN,
        message: t('errors.maxLength') + MAX_LENGTH.LOGIN,
      },
    },
    password: {
      required: t('errors.required'),
      minLength: {
        value: MIN_LENGTH.PASSWORD,
        message: t('errors.minLength') + MIN_LENGTH.PASSWORD,
      },
      maxLength: {
        value: MAX_LENGTH.PASSWORD,
        message: t('errors.maxLength') + MAX_LENGTH.PASSWORD,
      },
    },
    repeatPassword: {
      required: t('errors.required'),
      minLength: {
        value: MIN_LENGTH.PASSWORD,
        message: t('errors.minLength') + MIN_LENGTH.PASSWORD,
      },
      maxLength: {
        value: MAX_LENGTH.PASSWORD,
        message: t('errors.maxLength') + MAX_LENGTH.PASSWORD,
      },
    },
  };

  return (
    <form className='form' onSubmit={handleSubmit(onSubmit)}>
      <p className='title'>{isRegistered ? t('signIn') : t('signUp')}</p>
      <input
        type='text'
        {...register('login', { ...validation.login })}
        placeholder={t('placeholders.login')}
      />
      <p className='error'>{errors?.login?.message}</p>

      <input
        type='password'
        {...register('password', { ...validation.password })}
        placeholder={t('placeholders.password')}
      />
      <p className='error'>{errors?.password?.message}</p>

      {!isRegistered && (
        <>
          <input
            type='password'
            {...register('repeatPassword', { ...validation.password })}
            placeholder={t('placeholders.repeatPassword')}
          />
          {passwordCheck() ? (
            <p className='error'>{errors?.repeatPassword?.message}</p>
          ) : (
            <p className='error'>{t('errors.passwordMismatch')}</p>
          )}
        </>
      )}

      <input
        type='submit'
        value={t('buttons.submit') as string}
        disabled={!isValid || !passwordCheck()}
      />
      <p className='text'>
        {isRegistered ? t('goSignIn') : t('goSignUp')}
        <button className='button' onClick={handleClick} type='button'>
          {(isRegistered ? t('signIn') : t('signUp')) as string}
        </button>
      </p>
    </form>
  );
}
