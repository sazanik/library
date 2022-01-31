import { yupResolver } from '@hookform/resolvers/yup';
import { Box, Button, Typography } from '@mui/material';
import { format, isValid } from 'date-fns';
import React from 'react';
import { Controller, ControllerRenderProps, useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';

import { useAppDispatch, useAppSelector } from '../../../hooks';
import { createAuthor, updateAuthor } from '../../../store/authors/actions';
import { AuthorFormProps, AuthorProps } from '../../../types/inerfaces';
import { CountrySelect } from '../../Country/Select/CountrySelect';
import { DateSelect } from '../../Date/Select/DateSelect';
import { Input } from '../../Input/Input';
import { styles } from './AuthorForm.styles';
import { getAuthorSchema } from './validation';

export interface ComponentProps {
  edit: boolean;
  author: AuthorProps;
  setIsOpenModal: (params: boolean) => void;
}

export const AuthorForm = (props: ComponentProps): JSX.Element => {
  const { edit, author, setIsOpenModal } = props;
  const { additionalError } = useAppSelector((state) => state.app);
  const { t } = useTranslation();
  const dispatch = useAppDispatch();

  const {
    register,
    handleSubmit,
    control,
    resetField,
    watch,
    formState: { errors },
  } = useForm<AuthorFormProps>({
    resolver: yupResolver(getAuthorSchema(t)),
  });

  const handleChangeDate = (
    date: Date,
    field: ControllerRenderProps<AuthorFormProps, 'birthDate'>
  ): void => {
    resetField('birthDate');
    console.log(date);
    if (!isValid(date)) {
      return;
    }
    const year = new Date(date).getFullYear();
    const month = new Date(date).getMonth();
    const day = new Date(date).getDate();
    const formatDate = format(new Date(year, month, day), 'MM/dd/yyyy');
    field.onChange(formatDate);
  };

  const onSubmit = async (data: AuthorFormProps): Promise<void> => {
    if (edit) {
      dispatch(
        updateAuthor({
          ...data,
          id: author.id,
        })
      );
    } else {
      dispatch(createAuthor(data));
    }
    setIsOpenModal(false);
  };
  const buttonName: string = edit ? t('buttons:confirm') : t('buttons:add');

  console.log(watch('birthDate'));

  return (
    <Box component='form' sx={styles.box}>
      <Input
        sx={styles.textField}
        type='text'
        {...register('firstName')}
        label={t('placeholders:firstName')}
        defaultValue={edit ? author?.firstName : ''}
      />
      <Typography align='center' sx={styles.error}>
        {errors?.firstName?.message}
      </Typography>
      <Input
        sx={styles.textField}
        type='text'
        {...register('lastName')}
        label={t('placeholders:lastName')}
        defaultValue={edit ? author?.lastName : ''}
      />
      <Typography align='center' sx={styles.error}>
        {errors?.lastName?.message}
      </Typography>

      <Controller
        name='birthDate'
        defaultValue={edit ? author?.birthDate : ''}
        control={control}
        render={({ field }) => (
          <DateSelect
            label={t('placeholders:birthDate')}
            value={field.value}
            onChange={(date) => handleChangeDate(date as Date, field)}
          />
        )}
      />

      <Typography align='center' sx={styles.error}>
        {errors?.birthDate?.message}
      </Typography>

      <CountrySelect
        {...register('country')}
        sx={styles.textField}
        defaultValue={edit ? author?.country : ''}
      />

      <Typography align='center' sx={styles.error}>
        {additionalError}
      </Typography>

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
