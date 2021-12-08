import React from 'react';
import { useForm } from 'react-hook-form';
import './AddAuthor.scss';
import { useTranslation } from 'react-i18next';
import { COUNTRIES } from '../../../constants/constants';
import {
  Author,
  createAuthor,
  updateAuthor,
} from '../../../features/authors/authorsSlice';
import { useAppDispatch } from '../../../App/hooks';

interface Props {
  edit: boolean;
  author: Author | null;
  closeModal: any; // todo fix
}

export default function AddAuthor(props: Props): JSX.Element {
  const { t } = useTranslation('translations');
  const dispatch = useAppDispatch();
  const { edit, author, closeModal } = props;
  const { register, handleSubmit } = useForm();
  const onSubmit = (data: Author): void => {
    const id = Date.now().toString().slice(5);
    if (edit && author) {
      dispatch(
        updateAuthor({
          id: author.id,
          changes: { ...data },
        })
      );
    } else {
      dispatch(
        createAuthor({
          ...data,
          id,
        })
      );
    }
    closeModal();
  };

  return (
    <form className='AddAuthor' onSubmit={handleSubmit(onSubmit)}>
      <input
        {...register('firstName')}
        placeholder='First name'
        defaultValue={edit ? author?.firstName : ''}
      />
      <input
        {...register('lastName')}
        placeholder='Last name'
        defaultValue={edit ? author?.lastName : ''}
      />
      <input
        {...register('birthDate')}
        placeholder='Birth date'
        defaultValue={edit ? author?.birthDate : ''}
      />
      <select
        {...register('country')}
        defaultValue={edit ? author?.country : ''}
      >
        {COUNTRIES.map((country) => (
          <option key={country.code + country.label} value={country.label}>
            {country.label}
          </option>
        ))}
      </select>
      <input type='submit' value={edit ? t('confirm') : t('add')} />
    </form>
  );
}
