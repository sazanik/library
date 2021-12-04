import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import './AddBook.scss';
import { Book, createBook, updateBook } from "../../../features/books/booksSlice";
import { Author } from "../../../features/authors/authorsSlice";
import { useAppDispatch } from "../../../App/hooks";
import { useAllAuthors, useAllBooks } from "../../../App/store";

interface IProps {
  edit: boolean,
  author: Author | null,
  book: Book | null,
  closeModal: any
}

export default function AddBook(props: IProps) {
  const authors = useAllAuthors();
  const books = useAllBooks()
  const dispatch = useAppDispatch();
  const { edit, author, book: propsBook, closeModal } = props;
  const { register, handleSubmit } = useForm();
  const [authorId, setAuthorId] = useState(author?.id || authors[0]?.id);
  const [book, setBook] = useState(propsBook || books[0])

  const onSubmit = (data: Book) => {
    const id = Math.random().toString();
    if (edit) {
      if(!book) return
      const updatedBook = { ...data, authorName: getAuthor() };
      dispatch(updateBook({ id: book.id, changes: { ...updatedBook } }));
    } else {
      const book = { ...data, authorName: getAuthor(), id };
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
