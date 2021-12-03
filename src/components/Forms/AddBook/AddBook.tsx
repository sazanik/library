import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import './AddBook.scss';
import { useAppDispatch } from "../../../App/hooks";
import { Book, createBook, updateBook } from "../../../features/books/booksSlice";
import { allAuthors, Author } from "../../../features/authors/authorsSlice";

interface IProps {
  edit: boolean,
  author: Author | null,
  book: Book | null,
  closeModal: any
}

export default function AddBook(props: IProps) {
  const { edit, author, book, closeModal } = props;

  const dispatch = useAppDispatch();
  const { register, handleSubmit } = useForm();
  const [authorId, setAuthorId] = useState(author?.id || allAuthors[0]?.id);

  const onSubmit = (data: Book) => {
    const id = Math.random().toString();
    if (edit && book) {
      const updatedBook = { ...data, authorName: getAuthor() };
      dispatch(updateBook({ id: book.id, changes: { ...updatedBook } }));
    } else {
      const book = { ...data, authorName: getAuthor(), id };
      dispatch(createBook(book));
    }
    closeModal();
  };

  const getAuthor = (): string => {
    const author: Author | undefined = allAuthors.find((author: Author) => author.id === authorId);
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
      <input {...register('title')} placeholder="Title" defaultValue={edit ? book?.title : ''} />
      <input {...register('description')} placeholder="Description" defaultValue={edit ? book?.description : ''} />
      <input {...register('code')} placeholder="Code" defaultValue={edit ? book?.code : ''} />
      <select {...register('authorId')} value={authorId}>
        <option key={Math.random()} disabled>Select author...</option>
        {allAuthors.map(author => <option key={Math.random()} value={author.id}>
          {author.firstName + ' ' + author.lastName}
        </option>)}
      </select>
      <input {...register('pagesCount')} placeholder="Pages count" defaultValue={edit ? book?.pagesCount : ''} />
      <input {...register('year')} placeholder="Published year" defaultValue={edit ? book?.year : ''} />
      <input type="submit" value={edit ? 'confirm' : 'add'} />
    </form>
  );
}
