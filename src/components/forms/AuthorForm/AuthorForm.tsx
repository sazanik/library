import React from 'react';
import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import * as yup from 'yup';
import {
  COUNTRIES,
  MASKS,
  MAX_LENGTH,
  MIN_LENGTH,
} from '../../../constants/constants';
import {
  createAuthor,
  updateAuthor,
} from '../../../store/authors/authorsSlice';
import { AuthorProps } from '../../../types/inerfaces';
import { useAppDispatch } from '../../../hooks';
import { yupResolver } from '@hookform/resolvers/yup';

export interface Props {
  edit: boolean;
  author: AuthorProps | null;
  setOpenModal: (b: boolean) => void;
}

export interface FormProps {
  firstName: string;
  lastName: string;
  birthDate: string;
  country: string;
}

export const AuthorForm = (props: Props): JSX.Element => {
  const { t } = useTranslation('default');
  const dispatch = useAppDispatch();
  const { edit, author, setOpenModal } = props;

  const schema = yup.object().shape({
    firstName: yup
      .string()
      .required(t('errors.required'))
      .matches(MASKS.TEXT, t('errors.invalidData'))
      .min(MIN_LENGTH.NAME, t('errors.minLength') + MIN_LENGTH.NAME)
      .max(MAX_LENGTH.NAME, t('errors.maxLength') + MAX_LENGTH.NAME),
    lastName: yup
      .string()
      .required(t('errors.required'))
      .matches(MASKS.TEXT, t('errors.invalidData'))
      .min(MIN_LENGTH.NAME, t('errors.minLength') + MIN_LENGTH.NAME)
      .max(MAX_LENGTH.NAME, t('errors.maxLength') + MAX_LENGTH.NAME),
    birthDate: yup
      .string()
      .required(t('errors.required'))
      .matches(MASKS.DATE, t('errors.invalidData')),
    country: yup.string().required(t('errors.required')),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormProps>({
    mode: 'all',
    resolver: yupResolver(schema),
  });

  const onSubmit = (data: AuthorProps): void => {
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
    <form onSubmit={handleSubmit(onSubmit)}>
      <input
        type='text'
        {...register('firstName')}
        placeholder={t('placeholders.firstName')}
        defaultValue={edit ? author?.firstName : ''}
      />
      <p>{errors?.firstName?.message}</p>
      <input
        type='text'
        {...register('lastName')}
        placeholder={t('placeholders.lastName')}
        defaultValue={edit ? author?.lastName : ''}
      />
      <p>{errors?.lastName?.message}</p>

      <input
        type='date'
        {...register('birthDate')}
        placeholder={t('placeholders.birthDate')}
        defaultValue={edit ? author?.birthDate : ''}
      />
      <p>{errors?.birthDate?.message}</p>

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
};
