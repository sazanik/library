import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import CountrySelect from '../../CountrySelect/CountrySelect';

export default function AddAuthor() {
  const { register, handleSubmit } = useForm();
  const [result, setResult] = useState('');
  const onSubmit = (data: any) => setResult(JSON.stringify(data));

  return (
    <form
      className='addAuthor'
      onSubmit={handleSubmit(onSubmit)}
    >
      <input {...register('firstName')} placeholder="First name" />
      <input {...register('lastName')} placeholder="Last name" />
      <input {...register('birthDate')} placeholder="Birth date" />
      <CountrySelect />
      <input type="button" value='add'/>
      <p>{result}</p>
    </form>
  );
}
