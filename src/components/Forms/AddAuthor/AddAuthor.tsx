import React from 'react';
import { useForm } from 'react-hook-form';
import './AddAuthor.scss';
import { useDispatch } from 'react-redux';
import { countries } from './countriesData';
import { addAuthor } from '../../../features/authors/authorsSlice';
import { Author } from '../../../config/constants';

export default function AddAuthor() {
  const dispatch = useDispatch();
  const { register, handleSubmit } = useForm();

  const onSubmit = (data: Author) => {
    console.log(data);
    dispatch(addAuthor({...data, books: [], id: Math.random()}))
  }

  return (
    <form
      className="AddAuthor"
      onSubmit={handleSubmit(onSubmit)}
    >
      <input {...register('firstName')} placeholder="First name" />
      <input {...register('lastName')} placeholder="Last name" />
      <input {...register('birthDate')} placeholder="Birth date" />
      <select {...register('country')}>
        {countries.map(item => <option key={item.code + item.label} value={item.label}>{item.label}</option>)}
      </select>
      <input type="submit" value="add" />
    </form>
  );
}
