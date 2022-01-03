import React from 'react';
import { useForm } from 'react-hook-form';
import { TFunction, useTranslation } from 'react-i18next';
import * as yup from 'yup';
import { MASKS, MAX_LENGTH, MIN_LENGTH } from '../../../constants/constants';
import {
  createAuthor,
  updateAuthor,
} from '../../../store/authors/authorsSlice';
import { AuthorProps } from '../../../types/inerfaces';
import { useAppDispatch } from '../../../hooks';
import { yupResolver } from '@hookform/resolvers/yup';
import { AnyObjectSchema } from 'yup';
import { Box, Button, TextField, Typography } from '@mui/material';
import { styles } from './AuthorForm.styles';
import { CountrySelect } from '../../selects/CountrySelect/CountrySelect';

const getAuthorSchema = (t: TFunction): AnyObjectSchema =>
  yup.object().shape({
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

export interface ComponentProps {
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

export const AuthorForm = (props: ComponentProps): JSX.Element => {
  const { t } = useTranslation('default');
  const dispatch = useAppDispatch();
  const { edit, author, setOpenModal } = props;

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<FormProps>({
    mode: 'all',
    resolver: yupResolver(getAuthorSchema(t)),
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

  console.log(watch('country'));

  const buttonName: string = edit ? t('buttons.confirm') : t('buttons.add');

  return (
    <Box component='form' sx={styles.box}>
      <TextField
        sx={styles.textField}
        type='text'
        {...register('firstName')}
        label={t('placeholders.firstName')}
        defaultValue={edit ? author?.firstName : ''}
      />
      <Typography align='center' sx={styles.error}>
        {errors?.firstName?.message}
      </Typography>
      <TextField
        sx={styles.textField}
        type='text'
        {...register('lastName')}
        label={t('placeholders.lastName')}
        defaultValue={edit ? author?.lastName : ''}
      />
      <Typography align='center' sx={styles.error}>
        {errors?.lastName?.message}
      </Typography>

      <TextField
        sx={styles.textField}
        type='date'
        {...register('birthDate')}
        label={t('placeholders.birthDate')}
        defaultValue={edit ? author?.birthDate : ''}
        InputLabelProps={{
          shrink: true,
        }}
      />

      <Typography align='center' sx={styles.error}>
        {errors?.birthDate?.message}
      </Typography>

      <CountrySelect
        {...register('country')}
        sx={styles.textField}
        defaultValue={edit ? author?.country : ''}
      />

      <Button
        sx={styles.buttons.submit}
        onClick={handleSubmit(onSubmit)}
        variant='contained'
      >
        {buttonName}
      </Button>
    </Box>
  );
};
