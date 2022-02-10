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
  isEdit: boolean;
  author: AuthorProps;
  book: BookProps | undefined;
  setIsOpenModal: (params: boolean) => void;
}

interface FormProps {
  title: string;
  description: string;
  code: string;
  pagesCount: string;
  publishingYear: string;
  authorId: string;
}

export const BookForm = (props: componentProps): JSX.Element => {
  const { t } = useTranslation();
  const {
    isEdit,
    author: propsAuthor,
    book: propsBook,
    setIsOpenModal,
  } = props;
  const dispatch = useAppDispatch();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormProps>({
    resolver: yupResolver(getBookSchema(t)),
  });

  const onSubmit = (data: BookFormProps): void => {
    if (isEdit && propsBook) {
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
    setIsOpenModal(false);
  };

  const buttonName: string = isEdit ? t('buttons:confirm') : t('buttons:add');

  return (
    <Box component='form' sx={styles.box}>
      <Input
        sx={styles.textField}
        type='text'
        {...register('title')}
        label={t('placeholders:title')}
        defaultValue={isEdit ? propsBook?.title : ''}
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
        defaultValue={isEdit ? propsBook?.description : ''}
      />
      <Typography align='center' sx={styles.error}>
        {errors?.description?.message}
      </Typography>

      <Input
        sx={styles.textField}
        type='text'
        {...register('code')}
        label={t('placeholders:code')}
        defaultValue={isEdit ? propsBook?.code : ''}
      />
      <Typography align='center' sx={styles.error}>
        {errors?.code?.message}
      </Typography>

      <Input
        sx={styles.textField}
        type='number'
        {...register('pagesCount')}
        label={t('placeholders:pagesCount')}
        defaultValue={isEdit ? propsBook?.pagesCount : ''}
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
        defaultValue={isEdit ? propsBook?.publishingYear : ''}
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
