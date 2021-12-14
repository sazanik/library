import React, { ReactElement } from 'react';
import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { COUNTRIES } from '../../../constants/constants';
import {
  createAuthor,
  updateAuthor,
} from '../../../features/authors/authorsSlice';
import { useAppDispatch } from '../../../App/hooks';
import { IAuthor } from '../../../types/inerfaces';

interface IProps {
  edit: boolean;
  author: IAuthor | null;

  setOpenModal(b: boolean): void;
}

export default function AuthorForm(props: IProps): ReactElement {
  const { t } = useTranslation('default');
  const dispatch = useAppDispatch();
  const { edit, author, setOpenModal } = props;
  const { register, handleSubmit } = useForm();
  const onSubmit = (data: IAuthor): void => {
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
    setOpenModal(false);
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
