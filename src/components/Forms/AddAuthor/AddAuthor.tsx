import React from 'react';
import { useForm } from 'react-hook-form';
import './AddAuthor.scss';
import { useDispatch } from 'react-redux';
import { actions } from '../../../features/library/librarySlice';
import { Author } from '../../../types/author';
import { COUNTRIES } from "../../../constants/constants";

interface IProps {
  edit: boolean,
  author: Author,
  closeModal: any
}

export default function AddAuthor(props: IProps) {
  const {edit, author, closeModal} = props;
  const {createAuthor, editAuthor} = actions;
  const dispatch = useDispatch();
  const {register, handleSubmit} = useForm();

  const onSubmit = (data: Author) => {
    const id = Math.random().toString();
    if (edit) {
      dispatch(editAuthor({...author, ...data}));
    } else {
      dispatch(createAuthor({...data, books: [], id}));
    }
    closeModal();
  };

  return (
    <form
      className="AddAuthor"
      onSubmit={handleSubmit(onSubmit)}
    >
      <input {...register('firstName')} placeholder="First name" defaultValue={edit ? author.firstName : ''} />
      <input {...register('lastName')} placeholder="Last name" defaultValue={edit ? author.lastName : ''} />
      <input {...register('birthDate')} placeholder="Birth date" defaultValue={edit ? author.birthDate : ''} />
      <select {...register('country')} defaultValue={edit ? author.country : ''}>
        {COUNTRIES.map(country => <option key={country.code + country.label}
                                          value={country.label}>{country.label}</option>)}
      </select>
      <input type="submit" value={edit ? 'confirm' : 'add'} />
    </form>
  );
}
