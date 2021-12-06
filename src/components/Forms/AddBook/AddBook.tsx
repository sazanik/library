import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import './AddBook.scss';
import { Book, createBook, updateBook } from "../../../features/books/booksSlice";
import { Author, updateAuthor } from "../../../features/authors/authorsSlice";
import { useAppDispatch } from "../../../App/hooks";
import { useAllAuthors, store, authorsSelectors } from "../../../App/store";

interface Props {
  edit: boolean,
  author: Author,
  book: Book,
  closeModal: any
}

export default function AddBook(props: Props) {
  const { edit, author: propsAuthor, book: propsBook, closeModal } = props;
  const dispatch = useAppDispatch();
  const authors = useAllAuthors();
  const [author, setAuthor] = useState<Author>(propsAuthor);
  const [book, setBook] = useState<Book>(propsBook);
  const { register, handleSubmit } = useForm();

  const onSubmit = (data: Book) => {
    const id = Date.now().toString().slice(5);
    if (edit) {
      const updatedBook = { ...data, authorName: getAuthorName() };
      dispatch(updateBook({ id: book.id, changes: { ...updatedBook } }));

    } else {
      const book = { ...data, authorName: getAuthorName(), id };
      dispatch(createBook(book));
      console.log(author.books, book.id);
      dispatch(updateAuthor({ id: author.id, changes: { books: [...author.books, book.id] } }));
    }
    closeModal();
  };

  const getAuthorName = (): string => {
    return author.firstName + ' ' + author.lastName;
  };

  register('authorId', {
    onChange: event => {
      const authorId = event.currentTarget.value;
      const author = authorsSelectors.selectById(store.getState(), authorId);
      if (author) {
        setAuthor(author);
      }
    }
  });

  console.log(author);
  return (
    <form
      className="AddBook"
      onSubmit={handleSubmit(onSubmit)}
    >
      <input {...register('title')} placeholder="Title" defaultValue={edit ? book.title : ''} />
      <input {...register('description')} placeholder="Description" defaultValue={edit ? book.description : ''} />
      <input {...register('code')} placeholder="Code" defaultValue={edit ? book.code : ''} />
      <select {...register('authorId')} value={author.id}>
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
