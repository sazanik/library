import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import './AddBook.scss';
import {
  Book,
  createBook,
  updateBook,
} from '../../../features/books/booksSlice';
import { Author } from '../../../features/authors/authorsSlice';
import { useAppDispatch } from '../../../App/hooks';
import { useAllAuthors, store, authorsSelectors } from '../../../App/store';

interface Props {
  edit: boolean;
  author: Author;
  book: Book;
  closeModal: any; // todo fix
}

export default function AddBook(props: Props): JSX.Element {
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

  return (
    <form className='AddBook' onSubmit={handleSubmit(onSubmit)}>
      <input
        {...register('title')}
        placeholder='Title'
        defaultValue={edit ? book.title : ''}
      />
      <input
        {...register('description')}
        placeholder='Description'
        defaultValue={edit ? book.description : ''}
      />
      <input
        {...register('code')}
        placeholder='Code'
        defaultValue={edit ? book.code : ''}
      />
      <select {...register('authorId')} value={currentAuthor.id}>
        <option key={Math.random()} disabled>
          Select author...
        </option>
        {authors.map((author) => (
          <option key={Math.random()} value={author.id}>
            {`${author.firstName} ${author.lastName}`}
          </option>
        ))}
      </select>
      <input
        {...register('pagesCount')}
        placeholder='Pages count'
        defaultValue={edit ? book.pagesCount : ''}
      />
      <input
        {...register('year')}
        placeholder='Published year'
        defaultValue={edit ? book.year : ''}
      />
      <input type='submit' value={edit ? 'confirm' : 'add'} />
    </form>
  );
}
