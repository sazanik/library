import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { createBook, updateBook } from '../../../store/books/booksSlice';
import { authorsSelectors, store } from '../../../store/store';
import { AuthorProps, BookProps } from '../../../types/inerfaces';
import { MASKS, MAX_LENGTH, MIN_LENGTH } from '../../../constants/constants';
import { useAllAuthors, useAppDispatch } from '../../../hooks';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';

interface Props {
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

export const BookForm = (props: Props): JSX.Element => {
  const { t } = useTranslation('default');
  const { edit, author: propsAuthor, book, setOpenModal } = props;
  const dispatch = useAppDispatch();
  const authors = useAllAuthors();

  const schema = yup.object().shape({
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

  const [currentAuthor, setCurrentAuthor] = useState<AuthorProps>(propsAuthor);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormProps>({
    mode: 'all',
    resolver: yupResolver(schema),
  });

  const getAuthorName = (): string =>
    `${currentAuthor.firstName} ${currentAuthor.lastName}`;

  const onSubmit = (data: BookProps): void => {
    const id = Date.now().toString().slice(5);
    if (edit && book) {
      const updatedBook = {
        ...data,
        authorName: getAuthorName(),
      };
      dispatch(
        updateBook({
          id: book.id,
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

  register('authorId', {
    onChange: (event) => {
      const authorId = event.currentTarget.value;
      const author = authorsSelectors.selectById(store.getState(), authorId);
      if (author) {
        setCurrentAuthor(author);
      }
    },
  });

  const buttonName: string = edit ? t('buttons.confirm') : t('buttons.add');

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <input
        type='text'
        {...register('title')}
        placeholder={t('placeholders.title')}
        defaultValue={edit ? book?.title : ''}
      />
      <p>{errors?.title?.message}</p>

      <textarea
        {...register('description')}
        placeholder={t('placeholders.description')}
        defaultValue={edit ? book?.description : ''}
      />
      <p>{errors?.description?.message}</p>

      <input
        type='text'
        {...register('code')}
        placeholder={t('placeholders.code')}
        defaultValue={edit ? book?.code : ''}
      />
      <p>{errors?.code?.message}</p>

      <select {...register('authorId')} value={currentAuthor.id}>
        <option key={Math.random()} disabled>
          {t('placeholders.selectAuthor')}
        </option>
        {authors.map((author) => (
          <option key={Math.random()} value={author.id}>
            {`${author.firstName} ${author.lastName}`}
          </option>
        ))}
      </select>
      <p>{}</p>

      <input
        type='number'
        {...register('pagesCount')}
        placeholder={t('placeholders.pagesCount')}
        defaultValue={edit ? book?.pagesCount : ''}
      />
      <p>{errors?.pagesCount?.message}</p>

      <input
        type='number'
        {...register('publishingYear')}
        placeholder={t('placeholders.publishingYear')}
        defaultValue={edit ? book?.publishingYear : ''}
      />
      <p>{errors?.publishingYear?.message}</p>
      <input type='submit' value={buttonName} />
    </form>
  );
};
