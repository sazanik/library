import React, { ReactElement, useState } from 'react';
import { useForm } from 'react-hook-form';
import { IUser } from '../../../types/inerfaces';
import { useTranslation } from 'react-i18next';
import { useAuth } from '../../../App/hooks';

export default function AuthForm(): ReactElement {
  const { t } = useTranslation('default');
  const { isRegistered, setIsRegistered } = useAuth();
  const { register, handleSubmit } = useForm();
  const [result, setResult] = useState('');

  const onSubmit = (data: IUser): void => {
    setResult(JSON.stringify(data));
  };

  const handleClick = (): void => {
    setIsRegistered((prev) => !prev);
  };

  return (
    <form className='form' onSubmit={handleSubmit(onSubmit)}>
      <p className='title'>{isRegistered ? t('signIn') : t('signUp')}</p>
      <input {...register('login')} placeholder={t('placeholders.login')} />
      <input
        {...register('password')}
        placeholder={t('placeholders.password')}
      />

      {!isRegistered && (
        <input
          {...register('password')}
          placeholder={t('placeholders.repeatPassword')}
        />
      )}
      <p>{result}</p>
      <input type='submit' value={t('buttons.submit') as string} />
      <p className='text'>
        {isRegistered ? t('goSignIn') : t('goSignUp')}
        <button className='button' onClick={handleClick} type='button'>
          {(isRegistered ? t('signIn') : t('signUp')) as string}
        </button>
      </p>
    </form>
  );
}
