import React, { ReactElement } from 'react';
import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import {
  COUNTRIES,
  MASKS,
  MAX_LENGTH,
  MIN_LENGTH,
} from '../../../constants/constants';
import {
  createAuthor,
  updateAuthor,
} from '../../../features/authors/authorsSlice';
import { useAppDispatch } from '../../../App/hooks';
import { AuthorProps } from '../../../types/inerfaces';

interface Props {
  edit: boolean;
  author: AuthorProps | null;
  setOpenModal: (b: boolean) => void;
}

interface IFormValues {
  firstName: string;
  lastName: string;
  birthDate: string;
  country: string;
}

export default function AuthorForm(props: Props): ReactElement {
  const { t } = useTranslation('default');
  const dispatch = useAppDispatch();
  const { edit, author, setOpenModal } = props;
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IFormValues>({
    mode: 'all',
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

  const options = {
    firstName: {
      required: t('errors.required'),
      minLength: {
        value: MIN_LENGTH.NAME,
        message: t('errors.minLength') + MIN_LENGTH.NAME,
      },
      maxLength: {
        value: MAX_LENGTH.NAME,
        message: t('errors.maxLength') + MAX_LENGTH.NAME,
      },
      pattern: {
        value: MASKS.TEXT,
        message: t('errors.invalidData'),
      },
    },
    lastName: {
      required: t('errors.required'),
      minLength: {
        value: MIN_LENGTH.NAME,
        message: t('errors.minLength') + MIN_LENGTH.NAME,
      },
      maxLength: {
        value: MAX_LENGTH.NAME,
        message: t('errors.maxLength') + MAX_LENGTH.NAME,
      },
      pattern: {
        value: MASKS.TEXT,
        message: t('errors.invalidData'),
      },
    },
    birthDate: {
      required: t('errors.required'),
      pattern: {
        value: MASKS.DATE,
        message: t('errors.invalidData'),
      },
    },
  };

  const buttonName: string = edit ? t('buttons.confirm') : t('buttons.add');

  return (
    <form className='form' onSubmit={handleSubmit(onSubmit)}>
      <input
        type='text'
        {...register('firstName', { ...options.firstName })}
        placeholder={t('placeholders.firstName')}
        defaultValue={edit ? author?.firstName : ''}
      />
      <p className='error'>{errors?.firstName?.message}</p>
      <input
        type='text'
        {...register('lastName', { ...options.lastName })}
        placeholder={t('placeholders.lastName')}
        defaultValue={edit ? author?.lastName : ''}
      />
      <p className='error'>{errors?.lastName?.message}</p>

      <input
        type='date'
        {...register('birthDate', { ...options.birthDate })}
        placeholder={t('placeholders.birthDate')}
        defaultValue={edit ? author?.birthDate : ''}
      />
      <p className='error'>{errors?.birthDate?.message}</p>

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
      <p className='error'>{}</p>
      <input type='submit' value={buttonName} />
    </form>
  );
}
