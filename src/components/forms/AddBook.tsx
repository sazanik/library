import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { Book, createBook, updateBook } from '../../features/books/booksSlice';
import { Author } from '../../features/authors/authorsSlice';
import { useAppDispatch } from '../../App/hooks';
import { authorsSelectors, store, useAllAuthors } from '../../App/store';

interface Props {
  edit: boolean;
  author: Author;
  book: Book;
  closeModal(): void;
}

export default function AddBook(props: Props): JSX.Element {
  const { t } = useTranslation('translation');
  const { edit, author: propsAuthor, book, closeModal } = props;
  const dispatch = useAppDispatch();
  const authors = useAllAuthors();
  const [currentAuthor, setCurrentAuthor] = useState<Author>(propsAuthor);
  const { register, handleSubmit } = useForm();

  const getAuthorName = (): string =>
    `${currentAuthor.firstName} ${currentAuthor.lastName}`;

  const onSubmit = (data: Book): void => {
    const id = Date.now().toString().slice(5);
    if (edit) {
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
    closeModal();
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

  const buttonName: string = edit ? t('confirm') : t('add');

  return (
    <form className='form' onSubmit={handleSubmit(onSubmit)}>
      <input
        {...register('title')}
        placeholder={t('placeholders.title')}
        defaultValue={edit ? book.title : ''}
      />
      <input
        {...register('description')}
        placeholder={t('placeholders.description')}
        defaultValue={edit ? book.description : ''}
      />
      <input
        {...register('code')}
        placeholder={t('placeholders.code')}
        defaultValue={edit ? book.code : ''}
      />
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
      <input
        {...register('pagesCount')}
        placeholder={t('placeholders.pagesCount')}
        defaultValue={edit ? book.pagesCount : ''}
      />
      <input
        {...register('publishingYear')}
        placeholder={t('placeholders.publishingYear')}
        defaultValue={edit ? book.year : ''}
      />
      <input type='submit' value={buttonName} />
    </form>
  );
}
