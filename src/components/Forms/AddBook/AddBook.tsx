import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import './AddBook.scss';
import { useDispatch, useSelector } from 'react-redux';
import { selectLibrary } from "../../../features/library/librarySlice";
import { actions } from '../../../features/library/librarySlice';
import { Book } from "../../../types/book";
import { Author } from "../../../types/author";

interface IProps {
  edit: boolean,
  author: Author,
  book: Book,
  closeModal: any
}

export default function AddBook(props: IProps) {
  const {edit, author, book, closeModal} = props;
  const authors = useSelector(selectLibrary);
  const {createBook, editBook} = actions;
  const dispatch = useDispatch();
  const {register, handleSubmit} = useForm();
  const [authorId, setAuthorId] = useState(author?.id || authors[0].id);

  const onSubmit = (data: Book) => {
    const id = Math.random().toString();
    if (edit) {
      const updatedBook = {...book, ...data, authorName: getAuthor()};
      dispatch(editBook(updatedBook));
    } else {
      const book = {...data, authorName: getAuthor(), id};
      dispatch(createBook(book));
    }
    closeModal();
  };

  const getAuthor = (): string => {
    const author: Author | undefined = authors.find((author: Author) => author.id === authorId);
    return author?.firstName + ' ' + author?.lastName;
  };

  register('authorId', {
    onChange: event => {
      const value = event.currentTarget.value;
      setAuthorId(value);
    }
  });

  return (
    <form
      className="AddBook"
      onSubmit={handleSubmit(onSubmit)}
    >
      <input {...register('title')} placeholder="Title" defaultValue={edit ? book.title : ''} />
      <input {...register('description')} placeholder="Description" defaultValue={edit ? book.description : ''} />
      <input {...register('code')} placeholder="Code" defaultValue={edit ? book.code : ''} />
      <select {...register('authorId')} value={authorId}>
        <option key={Math.random()} disabled>Select author...</option>
        {authors.map(author => <option key={Math.random()} value={author.id}>
          {author.firstName + ' ' + author.lastName}
        </option>)}
      </select>
      <input {...register('pagesCount')} placeholder="Pages count" defaultValue={edit ? book.pagesCount : ''} />
      <input {...register('year')} placeholder="Published year" defaultValue={edit ? book.year : ''} />
      <input type="submit" value={edit ? 'confirm' : 'add'} />
    </form>
  );
}
