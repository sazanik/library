import React from 'react';
import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { bdCreateAuthor, bdUpdateAuthor } from '../../../store/authors/actions';
import { AuthorProps } from '../../../types/inerfaces';
import { useAppDispatch } from '../../../hooks';
import { CountrySelect } from '../../Country/Select/CountrySelect';
import { CustomInput } from '../../UI/CustomInput/CustomInput';
import { Box, Button, Typography } from '@mui/material';
import { yupResolver } from '@hookform/resolvers/yup';
import { getAuthorSchema } from './validation';
import { styles } from './AuthorForm.styles';
import { nanoid } from '@reduxjs/toolkit';

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
    formState: { errors },
  } = useForm<FormProps>({
    mode: 'all',
    resolver: yupResolver(getAuthorSchema(t)),
  });

  const onSubmit = async (data: AuthorProps): Promise<void> => {
    const newData = {
      ...data,
      id: nanoid(),
    };
    if (edit && author) {
      dispatch(
        bdUpdateAuthor({
          ...newData,
          id: author.id,
        })
      );
    } else {
      dispatch(bdCreateAuthor(newData));
    }
    setOpenModal(false);
  };
  const buttonName: string = edit ? t('buttons.confirm') : t('buttons.add');

  return (
    <Box component='form' sx={styles.box}>
      <CustomInput
        sx={styles.textField}
        type='text'
        {...register('firstName')}
        label={t('placeholders.firstName')}
        defaultValue={edit ? author?.firstName : ''}
      />
      <Typography align='center' sx={styles.error}>
        {errors?.firstName?.message}
      </Typography>
      <CustomInput
        sx={styles.textField}
        type='text'
        {...register('lastName')}
        label={t('placeholders.lastName')}
        defaultValue={edit ? author?.lastName : ''}
      />
      <Typography align='center' sx={styles.error}>
        {errors?.lastName?.message}
      </Typography>

      <CustomInput
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
