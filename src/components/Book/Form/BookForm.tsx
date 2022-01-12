import React from 'react';
import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { createBook, updateBook } from '../../../store/books/booksSlice';
import { AuthorProps, BookProps } from '../../../types/inerfaces';
import { useAppDispatch } from '../../../hooks';
import { yupResolver } from '@hookform/resolvers/yup';
import { styles } from '../../Author/Form/AuthorForm.styles';
import { Box, Button, Typography } from '@mui/material';
import { AuthorSelect } from '../../Author/Select/AuthorSelect';
import { authorsSelectors, store } from '../../../store/store';
import { CustomInput } from '../../UI/CustomInput/CustomInput';
import { getBookSchema } from './validation';
import { nanoid } from '@reduxjs/toolkit';

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
  const { t } = useTranslation('default');
  const { edit, author: propsAuthor, book: propsBook, setOpenModal } = props;
  const dispatch = useAppDispatch();

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<FormProps>({
    mode: 'all',
    resolver: yupResolver(getBookSchema(t)),
  });

  const getAuthorName = (): string => {
    const author = authorsSelectors.selectById(
      store.getState(),
      watch('authorId')
    );

    return `${author?.firstName} ${author?.lastName}`;
  };

  const onSubmit = (data: BookProps): void => {
    const id = nanoid();
    if (edit && propsBook) {
      const updatedBook = {
        ...data,
        authorName: getAuthorName(),
      };
      dispatch(
        updateBook({
          id: propsBook.id,
          changes: { ...updatedBook },
        })
      );
    } else {
      const newBook = {
        ...data,
        authorName: getAuthorName(),
        id,
      };
      dispatch(createBook(newBook));
    }
    setOpenModal(false);
  };

  const buttonName: string = edit ? t('buttons.confirm') : t('buttons.add');

  return (
    <Box component='form' sx={styles.box}>
      <CustomInput
        sx={styles.textField}
        type='text'
        {...register('title')}
        label={t('placeholders.title')}
        defaultValue={edit ? propsBook?.title : ''}
      />
      <Typography align='center' sx={styles.error}>
        {errors?.title?.message}
      </Typography>

      <CustomInput
        sx={styles.textField}
        type='text'
        multiline
        maxRows={10}
        {...register('description')}
        label={t('placeholders.description')}
        defaultValue={edit ? propsBook?.description : ''}
      />
      <Typography align='center' sx={styles.error}>
        {errors?.description?.message}
      </Typography>

      <CustomInput
        sx={styles.textField}
        type='text'
        {...register('code')}
        label={t('placeholders.code')}
        defaultValue={edit ? propsBook?.code : ''}
      />
      <Typography align='center' sx={styles.error}>
        {errors?.code?.message}
      </Typography>

      <CustomInput
        sx={styles.textField}
        type='number'
        {...register('pagesCount')}
        label={t('placeholders.pagesCount')}
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

      <CustomInput
        sx={styles.textField}
        type='number'
        {...register('publishingYear')}
        label={t('placeholders.publishingYear')}
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
