import React from 'react';
import { useForm } from 'react-hook-form';
import { TFunction, useTranslation } from 'react-i18next';
import { createBook, updateBook } from '../../../store/books/booksSlice';
import { AuthorProps, BookProps } from '../../../types/inerfaces';
import { MASKS, MAX_LENGTH, MIN_LENGTH } from '../../../constants/constants';
import { useAppDispatch } from '../../../hooks';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { AnyObjectSchema } from 'yup';
import { styles } from '../AuthorForm/AuthorForm.styles';
import { Box, Button, TextField, Typography } from '@mui/material';
import { AuthorSelect } from '../../selects/AuthorSelect/AuthorSelect';
import { authorsSelectors, store } from '../../../store/store';

const getBookSchema = (t: TFunction): AnyObjectSchema =>
  yup.object().shape({
    title: yup
      .string()
      .required(t('errors.required'))
      .min(MIN_LENGTH.TITLE, t('errors.minLength') + MIN_LENGTH.TITLE)
      .max(MAX_LENGTH.TITLE, t('errors.maxLength') + MAX_LENGTH.TITLE),
    description: yup
      .string()
      .required(t('errors.required'))
      .matches(MASKS.TEXT, t('errors.invalidData'))
      .min(
        MIN_LENGTH.DESCRIPTION,
        t('errors.minLength') + MIN_LENGTH.DESCRIPTION
      )
      .max(
        MAX_LENGTH.DESCRIPTION,
        t('errors.maxLength') + MAX_LENGTH.DESCRIPTION
      ),
    code: yup
      .string()
      .required(t('errors.required'))
      .matches(MASKS.NUMBER, t('errors.invalidData'))
      .min(MIN_LENGTH.CODE, t('errors.minLength') + MIN_LENGTH.CODE)
      .max(MAX_LENGTH.CODE, t('errors.maxLength') + MAX_LENGTH.CODE),
    pagesCount: yup
      .string()
      .required(t('errors.required'))
      .matches(MASKS.NUMBER, t('errors.invalidData'))
      .min(
        MIN_LENGTH.PAGES_COUNT,
        t('errors.minLength') + MIN_LENGTH.PAGES_COUNT
      )
      .max(
        MAX_LENGTH.PAGES_COUNT,
        t('errors.maxLength') + MAX_LENGTH.PAGES_COUNT
      ),
    publishingYear: yup
      .string()
      .required(t('errors.required'))
      .matches(MASKS.PUBLISHING_YEAR, t('errors.invalidData'))
      .min(
        MIN_LENGTH.PUBLISHING_YEAR,
        t('errors.minLength') + MIN_LENGTH.PUBLISHING_YEAR
      )
      .max(
        MAX_LENGTH.PUBLISHING_YEAR,
        t('errors.maxLength') + MAX_LENGTH.PUBLISHING_YEAR
      ),
  });

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
    const id = Date.now().toString().slice(5);
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
      <TextField
        sx={styles.textField}
        type='text'
        {...register('title')}
        label={t('placeholders.title')}
        defaultValue={edit ? propsBook?.title : ''}
      />
      <Typography align='center' sx={styles.error}>
        {errors?.title?.message}
      </Typography>

      <TextField
        sx={styles.textField}
        multiline
        maxRows={10}
        {...register('description')}
        label={t('placeholders.description')}
        defaultValue={edit ? propsBook?.description : ''}
      />
      <Typography align='center' sx={styles.error}>
        {errors?.description?.message}
      </Typography>

      <TextField
        sx={styles.textField}
        type='text'
        {...register('code')}
        label={t('placeholders.code')}
        defaultValue={edit ? propsBook?.code : ''}
      />
      <Typography align='center' sx={styles.error}>
        {errors?.code?.message}
      </Typography>

      <TextField
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

      <TextField
        sx={styles.textField}
        {...register('publishingYear')}
        placeholder={t('placeholders.publishingYear')}
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
