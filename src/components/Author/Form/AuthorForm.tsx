import { yupResolver } from '@hookform/resolvers/yup';
import { Box, Button, Typography } from '@mui/material';
import { format } from 'date-fns';
import React from 'react';
import { Controller, useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';

import { useAppDispatch, useAppSelector } from '../../../hooks';
import { createAuthor, updateAuthor } from '../../../store/authors/asyncActions';
import { AuthorFormProps, AuthorProps } from '../../../types/inerfaces';
import { CountrySelect } from '../../Country/Select/CountrySelect';
import { DateSelect } from '../../Date/Select/DateSelect';
import { Input } from '../../Input/Input';
import { styles } from './AuthorForm.styles';
import { getAuthorSchema } from './validation';

export interface ComponentProps {
  isEdit: boolean;
  author: AuthorProps;
  setIsOpenModal: (params: boolean) => void;
}

export const AuthorForm = (props: ComponentProps): JSX.Element => {
  const { isEdit, author, setIsOpenModal } = props;
  const { generalError } = useAppSelector((state) => state.app);
  const { t } = useTranslation();
  const dispatch = useAppDispatch();

  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<AuthorFormProps>({
    mode: 'onSubmit',
    resolver: yupResolver(getAuthorSchema(t)),
  });

  const onSubmit = async (data: AuthorFormProps): Promise<void> => {
    const birthDate = new Date(data.birthDate);
    const year = birthDate.getFullYear();
    const month = birthDate.getMonth();
    const day = birthDate.getDate();
    const formatBirthDate = format(new Date(year, month, day), 'MM/dd/yyyy');

    if (isEdit) {
      dispatch(
        updateAuthor({
          ...data,
          birthDate: formatBirthDate,
          id: author.id,
        })
      );
    } else {
      dispatch(
        createAuthor({
          ...data,
          birthDate: formatBirthDate,
        })
      );
    }
    setIsOpenModal(false);
  };
  const buttonName: string = isEdit ? t('buttons:confirm') : t('buttons:add');

  return (
    <Box component='form' sx={styles.box}>
      <Input
        sx={styles.textField}
        type='text'
        {...register('firstName')}
        label={t('placeholders:firstName')}
        defaultValue={isEdit ? author?.firstName : ''}
      />
      {errors?.firstName && (
        <Typography align='center' sx={styles.error}>
          {errors.firstName.message}
        </Typography>
      )}

      <Input
        sx={styles.textField}
        type='text'
        {...register('lastName')}
        label={t('placeholders:lastName')}
        defaultValue={isEdit ? author?.lastName : ''}
      />
      {errors?.lastName && (
        <Typography align='center' sx={styles.error}>
          {errors.lastName.message}
        </Typography>
      )}

      <Controller
        name='birthDate'
        defaultValue={isEdit ? author?.birthDate : new Date().toDateString()}
        control={control}
        render={({ field }) => (
          <DateSelect
            sx={styles.textField}
            label={t('placeholders:birthDate')}
            value={field.value}
            onChange={field.onChange}
          />
        )}
      />
      {errors?.birthDate && (
        <Typography align='center' sx={styles.error}>
          {errors.birthDate.message}
        </Typography>
      )}

      <CountrySelect
        sx={styles.textField}
        {...register('country')}
        label={t('placeholders:country')}
        defaultValue={isEdit ? author?.country : ''}
      />
      {errors?.country && (
        <Typography align='center' sx={styles.error}>
          {errors.country.message}
        </Typography>
      )}

      {generalError && (
        <Typography align='center' sx={styles.error}>
          {generalError}
        </Typography>
      )}

      <Button sx={styles.buttons.submit} onClick={handleSubmit(onSubmit)} variant='contained'>
        {buttonName}
      </Button>
    </Box>
  );
};
