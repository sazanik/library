import React from 'react';
import { useForm } from 'react-hook-form';
import './AddAuthor.scss';
import { useDispatch } from 'react-redux';
import { countries } from './countriesData';
import { addAuthor, editAuthor } from '../../../features/authors/authorsSlice';
import { Author } from '../../../config/constants';

export default function AddAuthor({ edit, author, closeModal }: { edit: boolean, author: Author, closeModal: any }) {
  const dispatch = useDispatch();
  const { register, handleSubmit } = useForm();

  const onSubmit = (data: Author) => {
    if (edit) dispatch(editAuthor({...author, ...data}))
    else dispatch(addAuthor({ ...data, books: [], id: Math.random() }));
    closeModal();
  };

  return (
    <form
      className="AddAuthor"
      onSubmit={handleSubmit(onSubmit)}
    >
      <input {...register('firstName')} placeholder="First name" defaultValue={edit ? author.firstName : ''}/>
      <input {...register('lastName')} placeholder="Last name" defaultValue={edit ? author.lastName : ''}/>
      <input {...register('birthDate')} placeholder="Birth date" defaultValue={edit ? author.birthDate : ''}/>
      <select {...register('country')} defaultValue={edit ? author.country : ''}>
        {countries.map(item => <option key={item.code + item.label} value={item.label}>{item.label}</option>)}
      </select>
      <input type="submit" value={edit ? 'confirm' : 'add'} />
    </form>
  );
}
