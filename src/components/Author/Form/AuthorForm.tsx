import { yupResolver } from '@hookform/resolvers/yup';
import { Box, Button, Typography } from '@mui/material';
import { format } from 'date-fns';
import React from 'react';
import { Controller, useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';

import { useAppDispatch } from '../../../hooks';
import { createAuthor, updateAuthor } from '../../../store/authors/actions';
import { AuthorFormProps, AuthorProps } from '../../../types/inerfaces';
import { CountrySelect } from '../../Country/Select/CountrySelect';
import { DateSelect } from '../../Date/Select/DateSelect';
import { Input } from '../../Input/Input';
import { styles } from './AuthorForm.styles';
import { getAuthorSchema } from './validation';

export interface ComponentProps {
  edit: boolean;
  author: AuthorProps | null;
  setIsOpenModal: (params: boolean) => void;
}

export const AuthorForm = (props: ComponentProps): JSX.Element => {
  const { t } = useTranslation();
  const dispatch = useAppDispatch();
  const { edit, author, setIsOpenModal } = props;

  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<AuthorFormProps>({
    resolver: yupResolver(getAuthorSchema(t)),
  });

  const onSubmit = async (data: AuthorFormProps): Promise<void> => {
    if (edit && author) {
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
            onChange={(date) => {
              const formatDate = format(new Date(date as Date), 'dd/MM/yyyy');
              field.onChange(formatDate);
            }}
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
