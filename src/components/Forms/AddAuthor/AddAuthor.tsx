import React from 'react';
import { useForm } from 'react-hook-form';
import './AddAuthor.scss';
import { useDispatch } from 'react-redux';
import { actions } from '../../../features/authors/authorsSlice';
import { Author } from '../../../types/author';
import { COUNTRIES } from "../../../constants/constants";


export default function AddAuthor({edit, author, closeModal}: { edit: boolean, author: Author, closeModal: any }) {
  const {addAuthor, editAuthor} = actions
  const dispatch = useDispatch();
  const {register, handleSubmit} = useForm();

  const onSubmit = (data: Author) => {
    if (edit) dispatch(editAuthor({...author, ...data}))
    else dispatch(addAuthor({...data, books: [], id: Math.random()}));
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
          {COUNTRIES.map(country => <option key={country.code + country.label} value={country.label}>{country.label}</option>)}
        </select>
        <input type="submit" value={edit ? 'confirm' : 'add'}/>
      </form>
  );
}
