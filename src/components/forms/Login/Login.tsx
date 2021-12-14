import React, { ReactElement, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { useLocation, useNavigate } from 'react-router-dom';

interface User {
  login: string;
  password: string;
}

export default function Login(): ReactElement {
  const { t } = useTranslation('default');
  const navigate = useNavigate();
  const location = useLocation();

  const fromView = location.state.from.path || '/';

  const { register, handleSubmit } = useForm();
  const [result, setResult] = useState('');
  const onSubmit = (data: User): void => setResult(JSON.stringify(data));

  return (
    <form className='form' onSubmit={handleSubmit(onSubmit)}>
      <input {...register('login')} placeholder={t('placeholders.login')} />
      <input
        {...register('password')}
        placeholder={t('placeholders.password')}
      />
      <p>{result}</p>
      <p>{fromView}</p>
      <input type='submit' value={t('buttons.submit') as string} />
    </form>
  );
}
