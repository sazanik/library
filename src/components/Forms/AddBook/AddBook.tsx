import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import './AddBook.scss';
import { useDispatch, useSelector } from 'react-redux';
import { actions } from '../../../features/authors/authorsSlice';
import { Book } from "../../../types/book";
import { selectAuthors } from "../../../features/authors/authorsSlice";
import { Author } from "../../../types/author";

export default function AddBook({edit, book, author, closeModal}: { edit: boolean, book: Book, author: Author, closeModal: any }) {
  const authors = useSelector(selectAuthors);
  const {createBook, editBook} = actions;
  const dispatch = useDispatch();
  const {register, handleSubmit} = useForm();
  const [authorId, setAuthorId] = useState(author?.id || authors[0].id)

  const onSubmit = (data: Book) => {
    if (edit) {
      const updatedBook = {...book, ...data, authorName: getAuthor()};
      console.log(updatedBook);
      dispatch(editBook(updatedBook));
    } else {
      const book = {...data, authorName: getAuthor(), id: Math.random().toString()};
      dispatch(createBook(book));
    }
    closeModal();
  };

  const getAuthor = (): string  => {
   const author: Author | undefined = authors.find((author: Author) => author.id === authorId)
    return author?.firstName + ' ' + author?.lastName
  }

  register('authorId', {
    onChange: event => {
      const value = event.currentTarget.value;
      setAuthorId(value)
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
