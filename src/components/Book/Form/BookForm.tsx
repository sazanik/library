import { yupResolver } from '@hookform/resolvers/yup';
import { Box, Button, Typography } from '@mui/material';
import React from 'react';
import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';

import { useAppDispatch } from '../../../hooks';
import { createBook, updateBook } from '../../../store/books/actions';
import {
  AuthorProps,
  BookFormProps,
  BookProps,
} from '../../../types/inerfaces';
import { styles } from '../../Author/Form/AuthorForm.styles';
import { AuthorSelect } from '../../Author/Select/AuthorSelect';
import { Input } from '../../Input/Input';
import { getBookSchema } from './validation';

interface componentProps {
  edit: boolean;
  author: AuthorProps;
  book: BookProps | undefined;
  setOpenModal: (b: boolean) => void;
}

interface FormProps {
  title: string;
  description: string;
  code: string;
  pagesCount: number;
  publishingYear: number;
  authorId: string;
}

export const BookForm = (props: componentProps): JSX.Element => {
  const { t } = useTranslation();
  const { edit, author: propsAuthor, book: propsBook, setOpenModal } = props;
  const dispatch = useAppDispatch();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormProps>({
    resolver: yupResolver(getBookSchema(t)),
  });

  const onSubmit = (data: BookFormProps): void => {
    if (edit && propsBook) {
      dispatch(
        updateBook({
          ...data,
          id: propsBook.id,
        })
      );
    } else {
      dispatch(
        createBook({
          ...data,
        })
      );
    }
    setOpenModal(false);
  };

  const buttonName: string = edit ? t('buttons:confirm') : t('buttons:add');

  return (
    <Box component='form' sx={styles.box}>
      <Input
        sx={styles.textField}
        type='text'
        {...register('title')}
        label={t('placeholders:title')}
        defaultValue={edit ? propsBook?.title : ''}
      />
      <Typography align='center' sx={styles.error}>
        {errors?.title?.message}
      </Typography>

      <Input
        sx={styles.textField}
        type='text'
        multiline
        maxRows={10}
        {...register('description')}
        label={t('placeholders:description')}
        defaultValue={edit ? propsBook?.description : ''}
      />
      <Typography align='center' sx={styles.error}>
        {errors?.description?.message}
      </Typography>

      <Input
        sx={styles.textField}
        type='text'
        {...register('code')}
        label={t('placeholders:code')}
        defaultValue={edit ? propsBook?.code : ''}
      />
      <Typography align='center' sx={styles.error}>
        {errors?.code?.message}
      </Typography>

      <Input
        sx={styles.textField}
        type='number'
        {...register('pagesCount')}
        label={t('placeholders:pagesCount')}
        defaultValue={edit ? propsBook?.pagesCount : ''}
      />
      <Typography align='center' sx={styles.error}>
        {errors?.pagesCount?.message}
      </Typography>

      <AuthorSelect
        sx={styles.textField}
        {...register('authorId')}
        defaultValue={propsAuthor.id}
      />

      <Input
        sx={styles.textField}
        type='number'
        {...register('publishingYear')}
        label={t('placeholders:publishingYear')}
        defaultValue={edit ? propsBook?.publishingYear : ''}
      />
      <Typography align='center' sx={styles.error}>
        {errors?.publishingYear?.message}
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
