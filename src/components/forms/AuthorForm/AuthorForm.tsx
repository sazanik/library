import React from 'react';
import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import {
  createAuthor,
  updateAuthor,
} from '../../../store/authors/authorsSlice';
import { AuthorProps } from '../../../types/inerfaces';
import { useAppDispatch } from '../../../hooks';
import { yupResolver } from '@hookform/resolvers/yup';
import { Box, Button, Typography } from '@mui/material';
import { styles } from './AuthorForm.styles';
import { CountrySelect } from '../../selects/CountrySelect/CountrySelect';
import { CustomInput } from '../../CustomInput/CustomInput';
import { getAuthorSchema } from './validation';

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
