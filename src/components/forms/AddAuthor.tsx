import React from 'react';
import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { COUNTRIES } from '../../constants/constants';
import {
  Author,
  createAuthor,
  updateAuthor,
} from '../../features/authors/authorsSlice';
import { useAppDispatch } from '../../App/hooks';

interface Props {
  edit: boolean;
  author: Author | null;

  handleCloseModal(): void;
}

export default function AddAuthor(props: Props): JSX.Element {
  const { t } = useTranslation('translation');
  const dispatch = useAppDispatch();
  const { edit, author, handleCloseModal } = props;
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
    handleCloseModal();
  };

  const buttonName: string = edit ? t('buttons.confirm') : t('buttons.add');

  return (
    <form className='form' onSubmit={handleSubmit(onSubmit)}>
      <input
        {...register('firstName')}
        placeholder={t('placeholders.firstName')}
        defaultValue={edit ? author?.firstName : ''}
      />
      <input
        {...register('lastName')}
        placeholder={t('placeholders.lastName')}
        defaultValue={edit ? author?.lastName : ''}
      />
      <input
        {...register('birthDate')}
        placeholder={t('placeholders.birthDate')}
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
      <input type='submit' value={buttonName} />
    </form>
  );
}
