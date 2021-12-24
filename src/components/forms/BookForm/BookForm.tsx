import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { createBook, updateBook } from '../../../store/books/booksSlice';
import { authorsSelectors, store } from '../../../store/store';
import { AuthorProps, BookProps } from '../../../types/inerfaces';
import { MASKS, MAX_LENGTH, MIN_LENGTH } from '../../../constants/constants';
import { useAllAuthors, useAppDispatch } from '../../../hooks';

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
  const [currentAuthor, setCurrentAuthor] = useState<AuthorProps>(propsAuthor);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormProps>({ mode: 'all' });

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

  const options = {
    title: {
      required: t('errors.required'),
      minLength: {
        value: MIN_LENGTH.NAME,
        message: t('errors.minLength') + MIN_LENGTH.TITLE,
      },
      maxLength: {
        value: MAX_LENGTH.NAME,
        message: t('errors.maxLength') + MAX_LENGTH.TITLE,
      },
      pattern: {
        value: MASKS.TEXT,
        message: t('errors.invalidData'),
      },
    },
    description: {
      required: t('errors.required'),
      minLength: {
        value: MIN_LENGTH.DESCRIPTION,
        message: t('errors.minLength') + MIN_LENGTH.DESCRIPTION,
      },
      maxLength: {
        value: MAX_LENGTH.DESCRIPTION,
        message: t('errors.maxLength') + MAX_LENGTH.DESCRIPTION,
      },
      pattern: {
        value: MASKS.TEXT,
        message: t('errors.invalidData'),
      },
    },
    code: {
      required: t('errors.required'),
      pattern: {
        value: MASKS.CODE,
        message: t('errors.invalidData'),
      },
      minLength: {
        value: MIN_LENGTH.CODE,
        message: t('errors.minLength') + MIN_LENGTH.CODE,
      },
      maxLength: {
        value: MAX_LENGTH.CODE,
        message: t('errors.maxLength') + MAX_LENGTH.CODE,
      },
    },
    pagesCount: {
      required: t('errors.required'),
      pattern: {
        value: MASKS.CODE,
        message: t('errors.invalidData'),
      },
      minLength: {
        value: MIN_LENGTH.PAGES_COUNT,
        message: t('errors.minLength') + MIN_LENGTH.PAGES_COUNT,
      },
      maxLength: {
        value: MAX_LENGTH.PAGES_COUNT,
        message: t('errors.maxLength') + MAX_LENGTH.PAGES_COUNT,
      },
    },
    publishingYear: {
      required: t('errors.required'),
      pattern: {
        value: MASKS.PUBLISHING_YEAR,
        message: t('errors.invalidData'),
      },
      minLength: {
        value: MIN_LENGTH.PUBLISHING_YEAR,
        message: t('errors.minLength') + MIN_LENGTH.PUBLISHING_YEAR,
      },
      maxLength: {
        value: MAX_LENGTH.PUBLISHING_YEAR,
        message: t('errors.maxLength') + MAX_LENGTH.PUBLISHING_YEAR,
      },
    },
  };

  const buttonName: string = edit ? t('buttons.confirm') : t('buttons.add');

  return (
    <form className='form' onSubmit={handleSubmit(onSubmit)}>
      <input
        type='text'
        {...register('title', { ...options.title })}
        placeholder={t('placeholders.title')}
        defaultValue={edit ? book?.title : ''}
      />
      <p className='error'>{errors?.title?.message}</p>

      <textarea
        {...register('description', { ...options.description })}
        placeholder={t('placeholders.description')}
        defaultValue={edit ? book?.description : ''}
      />
      <p className='error'>{errors?.description?.message}</p>

      <input
        type='text'
        {...register('code', { ...options.code })}
        placeholder={t('placeholders.code')}
        defaultValue={edit ? book?.code : ''}
      />
      <p className='error'>{errors?.code?.message}</p>

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
      <p className='error'>{}</p>

      <input
        type='number'
        {...register('pagesCount', { ...options.pagesCount })}
        placeholder={t('placeholders.pagesCount')}
        defaultValue={edit ? book?.pagesCount : ''}
      />
      <p className='error'>{errors?.pagesCount?.message}</p>

      <input
        type='number'
        {...register('publishingYear', options.publishingYear)}
        placeholder={t('placeholders.publishingYear')}
        defaultValue={edit ? book?.publishingYear : ''}
      />
      <p className='error'>{errors?.publishingYear?.message}</p>
      <input type='submit' value={buttonName} />
    </form>
  );
};
