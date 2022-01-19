import { yupResolver } from '@hookform/resolvers/yup';
import { Box, Button, Typography } from '@mui/material';
import React from 'react';
import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';

import { useAppDispatch } from '../../../hooks';
import { createAuthor, updateAuthor } from '../../../store/authors/actions';
import { AuthorFormProps, AuthorProps } from '../../../types/inerfaces';
import { CountrySelect } from '../../Country/Select/CountrySelect';
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

      <Input
        sx={styles.textField}
        type='date'
        {...register('birthDate')}
        label={t('placeholders:birthDate')}
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
