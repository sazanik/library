import React, { ReactElement, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';

interface User {
  login: string;
  password: string;
  repeatPassword: string;
}

export default function Registration(): ReactElement {
  const { t } = useTranslation('default');

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
      <input
        {...register('password')}
        placeholder={t('placeholders.repeatPassword')}
      />
      <p>{result}</p>
      <input type='submit' value={t('buttons.submit') as string} />
    </form>
  );
}
